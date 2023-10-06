import { SidebarItem } from "./sidebar-item";
import { MdHome } from "react-icons/md";
import { headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import MyHouseholdSection from "./my-household-section";

export default async function Sidebar({}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <aside className="h-screen x-[202] sticky top-0">
      {user == undefined ? (
        <></>
      ) : (
        <div className="bg-background transition-transform h-full fixed -translate-x-full w-64 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ">
          <div className="flex gap-8 items-center px-6">
            <h1>Baby'O'Meter</h1>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-6 mt-9 px-2">
              <SidebarItem
                title="Home"
                icon={<MdHome />}
                isActive={pathname === "/"}
                href="/"
              />
              <MyHouseholdSection />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
