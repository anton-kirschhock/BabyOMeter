"use client";
import LogoutButton from "@/components/LogoutButton";

import { User } from "@supabase/auth-helpers-nextjs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import AvatarArea from "./AvatarArea";

export default function UserDropdown({ user }: { user: User }) {
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <NavbarItem>
            <AvatarArea user={user} />
          </NavbarItem>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            as="p"
            key="profile"
            className="flex flex-col justify-start w-full items-start"
          >
            <p>Signed in as</p>
            <p>{user.email}</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" className="text-danger">
            <Link href="/auth/sign-out">Log out</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
