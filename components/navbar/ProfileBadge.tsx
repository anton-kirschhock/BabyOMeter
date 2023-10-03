import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

export default async function ProfileBadge({}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user !== undefined && user != null ? (
        <UserDropdown user={user} />
      ) : (
        <NavbarItem>
          <Link href="/login">Login</Link>
        </NavbarItem>
      )}
    </>
  );
}
