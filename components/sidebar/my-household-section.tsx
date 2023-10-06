import { MdAdd, MdGroup } from "react-icons/md";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export default async function MyHouseholdSection() {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  const supabase = createServerComponentClient<Database>({ cookies });
  const households = await supabase.from("Households").select();
  return (
    <SidebarMenu title={"Your households"}>
      {households?.data?.map((e) => (
        <SidebarItem
          key={e.id}
          title={e.name}
          icon={<MdGroup />}
          isActive={pathname?.startsWith(`/households/${e.id}`)}
          href={`/households/${e.id}`}
        />
      ))}
      <SidebarItem
        title="Add a household"
        color="green"
        icon={<MdAdd />}
        isActive={pathname === "/households/add"}
        href="/households/add"
      />
    </SidebarMenu>
  );
}
