import { MdAdd, MdGroup } from "react-icons/md";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export default async function MyFamilySection() {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  const supabase = createServerComponentClient<Database>({ cookies });
  const families = await supabase.from("Families").select();
  return (
    <SidebarMenu title={"Your Families"}>
      {families?.data?.map((e) => (
        <SidebarItem
          key={e.id}
          title={e.name}
          icon={<MdGroup />}
          isActive={pathname?.startsWith(`/families/${e.id}`)}
          href={`/families/${e.id}`}
        />
      ))}
      <SidebarItem
        title="Add a family"
        color="success"
        icon={<MdAdd />}
        isActive={pathname === "/families/add"}
        href="/families/add"
      />
    </SidebarMenu>
  );
}
