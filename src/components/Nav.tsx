import { userAuthStore } from "@/stores/AuthStore";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CloseButton,
  Container,
  Dialog,
  Heading,
  HStack,
  Image,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";
import { RiFileList3Line, RiMovie2Line } from "react-icons/ri";
import { PiHouse } from "react-icons/pi";
import { Link } from "react-router-dom";
import AuthenticationPopover from "./AuthenticationPopover";
import LogoutButton from "./LogoutButton";
import { ColorModeButton } from "./ui/color-mode";
import logo from "/images/cinefile.svg";
import { IconType } from "react-icons";
import ColorModeSwitch from "./ColorModeSwitch";

const MenuIcon: IconType = LuMenu;
const ChevronDownIcon: IconType = BsChevronDown;
const Movie: IconType = RiMovie2Line;
const FileList: IconType = RiFileList3Line;
const House: IconType = PiHouse;

const NavBar = () => {
  const authUser = userAuthStore((s) => s.authUser);
  const ChevronDownIcon = BsChevronDown as React.ElementType;

  return (
    <Box
      position="relative"
      paddingBlock="4"
      bg="layoutSecondary.bg"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="layoutSecondary.border"
    >
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW="7xl"
      >
        <Link to={"/"}>
          <Image src={logo} height="8" />
        </Link>

        {/* Desktop Navigation */}
        <HStack display={{ base: "none", md: "flex" }}>
          <HStack gap="4" paddingRight="4">
            <Button variant="plain" size="sm" padding="0" asChild>
              <Link to={"/"}>Home</Link>
            </Button>
            <Button variant="plain" size="sm" padding="0" asChild>
              <Link to={"/films"}>Films</Link>
            </Button>
            <Button variant="plain" size="sm" padding="0" asChild>
              <Link to={"/lists"}>Lists</Link>
            </Button>
          </HStack>
          <HStack gap="0">
            {authUser && (
              <>
                <Menu.Root>
                  <Menu.Trigger asChild>
                    <Button primary>
                      {authUser.displayName} <ChevronDownIcon />
                    </Button>
                  </Menu.Trigger>
                  <Portal closeOnSelect={false}>
                    <Menu.Positioner>
                      <Menu.Content>
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
                <Link to={"/users/" + authUser.id}>
                  <Avatar.Root shape="full" size="lg">
                    <Avatar.Fallback />
                    <Avatar.Image src={authUser.avatarURL} />
                  </Avatar.Root>
                </Link>
              </>
            )}
            {!authUser && <AuthenticationPopover />}
            <ColorModeButton
              paddingInline="2"
              w="44px"
              secondary
              _hover={{
                "& svg": {
                  stroke: "buttonSecondary.hoverText",
                },
              }}
            />
          </HStack>
        </HStack>

        <HStack display={{ base: "flex", md: "none" }} gap="0">
          {!authUser && <AuthenticationPopover />}
          <Dialog.Root size="full" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
              <Button secondary w="44px">
                <MenuIcon />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content padding="5" bg="layoutPrimary.bg">
                  <Dialog.Header>
                    <Heading fontSize="3xl">Navigation</Heading>
                  </Dialog.Header>
                  <Dialog.Body>
                    {authUser && (
                      <HStack
                        gap="5"
                        paddingBlock="7"
                        marginTop="4"
                        marginBottom="10"
                        borderTop="1px"
                        borderBottom="1px"
                        borderStyle="solid"
                        borderColor="border.card"
                      >
                        <Avatar.Root shape="full" size="2xl">
                          <Avatar.Fallback />
                          <Avatar.Image src={authUser.avatarURL} />
                        </Avatar.Root>
                        <VStack align="left" gap="1">
                          <Link to={"/users/" + authUser.id}>
                            {authUser.displayName}
                          </Link>
                          <Text>{authUser.email}</Text>
                          <HStack paddingTop="1">
                            <Badge primary>
                              <Link to={"/"}>Edit</Link>
                            </Badge>
                            <Badge primary>
                              <Link to={"/"}>Lists</Link>
                            </Badge>
                            <Badge primary>
                              <Link to={"/"}>Reviews</Link>
                            </Badge>
                          </HStack>
                        </VStack>
                      </HStack>
                    )}
                    <VStack align="left" gap="5" fontSize="lg">
                      <HStack gap="3">
                        <House size="25px" />
                        <Link to={"/"}>Home</Link>
                      </HStack>
                      <HStack gap="3">
                        <Movie size="25px" />
                        <Link to={"/films"}>Films</Link>
                      </HStack>
                      <HStack gap="3">
                        <FileList size="25px" />
                        <Link to={"/lists"}>Lists</Link>
                      </HStack>
                      <ColorModeSwitch />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton
                      size="xl"
                      variant="outline"
                      top="9"
                      right="9"
                    />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
