import { supabase } from "@/lib/supabaseClient";
import React from "react";

export default function useUserData() {
    const [userData, setUserData] = React.useState<{ email?: string, initials?: string } | undefined>(undefined);

    const loadUserData = async () => {
        const user = await supabase.auth.getUser();

        if (user?.error == null) {
            setUserData({
                email: user?.data?.user?.email,
                initials: user.data.user.email?.at(0)
            })
        } else {
            setUserData(undefined);
        }
    }

    React.useEffect(() => { loadUserData(); }, []);

    return { userData, loadUserData };

}