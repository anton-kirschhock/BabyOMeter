import { Baby } from "@/types/Baby";
import { DataHookResponse } from "./datahookResponse";
import React from "react";
import { Measure } from "@/types/Measure";
import { supabase } from "@/lib/supabaseClient";
import { DateTime } from "luxon";
import { delayAsync } from "@/lib/delayAsync";

export type BabyByIdViewModel = {
    baby: Baby;
    measures: Measure[];
};

type BabyByIdQuery = {
    id: string;
    date: DateTime;
} | undefined;
export default function useBabyById(): DataHookResponse<BabyByIdViewModel, BabyByIdQuery> {

    const [query, setQuery] = React.useState<BabyByIdQuery>(undefined);
    const [data, setData] = React.useState<BabyByIdViewModel>();
    const [loading, setLoading] = React.useState<boolean>(false);

    const refresh = async () => {
        if (query?.id === undefined) {
            return;
        }
        setLoading(true);
        await delayAsync(1000);
        const todayDate = query.date.startOf('day');
        const res = await supabase.from("Babies").select("*").eq("id", query?.id);
        const measures = await supabase.from("Measure")
            .select("*")
            .eq("BabyId", query?.id)
            .gte('CreatedAt', todayDate.toISO())
            .lte('CreatedAt', todayDate.endOf('day').toISO())
            .order('CreatedAt', { ascending: false });
        setData({ baby: res.data?.[0] as Baby, measures: measures.data as Measure[] })
        setLoading(false);
    };

    React.useEffect(() => {
        refresh();
    }, [query])

    return {
        data,
        loading,
        refresh,
        setQuery: (q) => setQuery(q),
        query
    }
}