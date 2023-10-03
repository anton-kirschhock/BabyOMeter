import { Navbar, NavbarContent } from "@nextui-org/navbar";
import UserDropdown from "./UserDropdown";
import ProfileBadge from "./ProfileBadge";

interface Props {
  children: React.ReactNode;
}

export default function NavBar({ children }: Props) {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent justify="end">
          <ProfileBadge />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
}
