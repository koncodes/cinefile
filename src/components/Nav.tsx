import { userAuthStore } from "@/stores/AuthStore";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CloseButton,
  Container,
  Dialog,
  Flex,
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
import {
  RiFileList3Line,
  RiMovie2Line,
  RiHome2Line,
  RiChat4Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import AuthenticationPopover from "./AuthenticationPopover";
import { LogoutButton, LogoutBadge } from "./LogoutButton";
import { ColorModeButton, useColorMode } from "./ui/color-mode";
import logoDark from "/images/cinefile.svg";
import logoLight from "/images/cinefileDark.svg";

import { IconType } from "react-icons";
import ColorModeSwitch from "./ColorModeSwitch";

const MenuIcon: IconType = LuMenu;
const ChevronDownIcon: IconType = BsChevronDown;
const Movie: IconType = RiMovie2Line;
const FileList: IconType = RiFileList3Line;
const House: IconType = RiHome2Line;
const Chat: IconType = RiChat4Line;

export function Logo() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? (
    <Image src={logoDark} height="8" />
  ) : (
    <Image src={logoLight} height="8" />
  );
}

const NavBar = () => {
  const authUser = userAuthStore((s) => s.authUser);

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
          <Logo />
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
                        <Menu.Item value="Lists" asChild>
                          <Link to={"/users/" + authUser.id + "/lists"}>
                            Lists
                          </Link>
                        </Menu.Item>
                        <Menu.Item value="AddList" asChild>
                          <Link to={"/lists/add"}>Add List</Link>
                        </Menu.Item>
                        <Menu.Item value="Settings" asChild>
                          <Link to={"/settings"}>Settings</Link>
                        </Menu.Item>
                        <Menu.Item value="Logout">
                          <LogoutButton />
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
                <Link to={"/users/" + authUser.id}>
                  <Avatar.Root shape="full" size="lg" colorPalette="brand">
                    <Avatar.Fallback />
                    <Avatar.Image src={authUser.avatarURL || undefined} />
                  </Avatar.Root>
                </Link>
              </>
            )}
            {!authUser && <AuthenticationPopover />}
            <ColorModeButton
              className="color-mode-button"
              paddingInline="2"
              w="44px"
              quaternary
              _hover={{
                "& svg": {
                  stroke: "brand.solid",
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
                        borderTop="1px"
                        borderStyle="solid"
                        borderColor="border.card"
                      >
                        <Avatar.Root shape="full" size="2xl">
                          <Avatar.Fallback />
                          <Avatar.Image src={authUser.avatarURL || undefined} />
                        </Avatar.Root>
                        <VStack align="left" gap="1">
                          <Link to={"/users/" + authUser.id}>
                            {authUser.displayName}
                          </Link>
                          <Text wordBreak="break-word">{authUser.email}</Text>
                          <HStack paddingTop="1">
                            <Badge primary>
                              <Link to={"/"}>Edit</Link>
                            </Badge>
                            <LogoutBadge />
                          </HStack>
                        </VStack>
                      </HStack>
                    )}
                    <VStack
                      align="left"
                      gap="5"
                      fontSize="md"
                      paddingBlock="7"
                      marginTop="1"
                      borderTop="1px"
                      borderStyle="solid"
                      borderColor="border.card"
                    >
                      <HStack gap="3">
                        <House />
                        <Link to={"/"}>Home</Link>
                      </HStack>
                      <HStack gap="3">
                        <Movie />
                        <Link to={"/films"}>Films</Link>
                      </HStack>
                      <HStack gap="3">
                        <FileList />
                        <Link to={"/lists"}>Lists</Link>
                      </HStack>
                      <HStack gap="3">
                        <Chat />
                        <Link to={"/lists"}>Reviews</Link>
                      </HStack>
                    </VStack>
                    <Flex
                      paddingBlock="7"
                      marginTop="1"
                      borderTop="1px"
                      borderStyle="solid"
                      borderColor="border.card"
                    >
                      <ColorModeSwitch />
                    </Flex>
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton quaternary top="8" right="9" width="44px" />
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
