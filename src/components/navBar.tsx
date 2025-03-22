import { Button, HStack, Image, Menu, Portal } from "@chakra-ui/react";
import logo from "/images/cinefile.svg";
import ColorModeSwitch from "./ColorModeSwitch";
import AuthenticationPopover from "./AuthenticationPopover";
import { userAuthStore } from "@/stores/AuthStore";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const authUser = userAuthStore((s) => s.authUser);
  const ChevronDownIcon = BsChevronDown as React.ElementType;

  return (
    <HStack
      justifyContent="space-between"
      paddingInline={{ base: "5", md: "10" }}
      paddingBlock="5"
      bg="layoutSecondary.bg"
    >
      <Link to={"/"}>
        <Image src={logo} height="8" />
      </Link>
      <HStack>
        {authUser && (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                size="sm"
                justifyContent="space-between"
              >
                {authUser.displayName} <ChevronDownIcon />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="Home" asChild>
                    <Link to={"/"}>Home</Link>
                  </Menu.Item>
                  <Menu.Item value="Profile" asChild>
                    <Link to={"/users/" + authUser.id}>Profile</Link>
                  </Menu.Item>
                  <Menu.Item value="NewList" asChild>
                    <Link to={"/lists/add"}>Add List</Link>
                  </Menu.Item>
                  <Menu.Item value="Logout">
                    <LogoutButton />
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )}
        <Button variant="outline" size="sm" asChild>
          <Link to={"/films"}>Films</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={"/lists"}>Lists</Link>
        </Button>
        {!authUser && <AuthenticationPopover />}
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
