"use client";

import { Avatar } from "@nextui-org/avatar";
import { User } from "@supabase/auth-helpers-nextjs";

export default function AvatarArea({ user }: { user: User }) {
  return (
    <Avatar
      as="button"
      color="secondary"
      size="md"
      name={user!.email}
      getInitials={(name) => name?.charAt(0)?.toUpperCase() ?? "-"}
    />
  );
}
