import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Marquee from "./Marquee";
import { Link } from "react-router-dom";
import { AiOutlineCopyright } from "react-icons/ai";
import { IconType } from "react-icons";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Twitter: IconType = FaTwitter;
const Instagram: IconType = FaInstagram;
const Facebook: IconType = FaFacebook;
const Youtube: IconType = FaYoutube;
const Linkedin: IconType = FaLinkedin;
const OutlineCopyright: IconType = AiOutlineCopyright;

const Footer = () => {
  return (
    <Flex h="full" bg="layoutSecondary.bg" grow="1" gap="0" direction="column">
      <Marquee bg="banner.bg" color="white" h="140px">
        <HStack fontFamily="customHeading" gap="3em" fontSize="2xl">
          <Link to="">Amazon Prime</Link>
          <Link to="">Netflix</Link>
          <Link to="">Max</Link>
          <Link to="">Disney+</Link>
          <Link to="">Hulu</Link>
          <Link to="">Paramount+</Link>
          <Link to="">Peacock</Link>
          <Link to="">Apple TV+</Link>
          <Link to="">Crunchyroll</Link>
        </HStack>
      </Marquee>
      <Flex
        paddingInline={{ base: "5", md: "10" }}
        paddingBlock={{ base: "4em", md: "4em" }}
        direction="column"
        gap="8"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap="8"
        >
          <HStack justify="flex-start" gap="6">
            <Link to="/">
              <ChakraLink variant="underline">Home</ChakraLink>
            </Link>
            <Link to="/films">
              <ChakraLink variant="underline">Films</ChakraLink>
            </Link>
            <Link to="/lists">
              <ChakraLink variant="underline">Lists</ChakraLink>
            </Link>
            <Link to="/members">
              <ChakraLink variant="underline">Members</ChakraLink>
            </Link>
            <Link to="/about">
              <ChakraLink variant="underline">About</ChakraLink>
            </Link>
            <Link to="/contact">
              <ChakraLink variant="underline">Contact</ChakraLink>
            </Link>
          </HStack>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            fontSize="l"
          >
            <HStack gap={6}>
              <Facebook size={24} />
              <Instagram size={24} />
              <Twitter size={24} />
              <Youtube size={24} />
              <Linkedin size={24} />
            </HStack>
          </Flex>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap="8"
        >
          <VStack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="flex-start"
            textTransform="uppercase"
            fontSize="xs"
            gap="1"
          >
            <Box>
              <HStack>
                <OutlineCopyright />
                2025{" "}
                <ChakraLink fontWeight="black">Cinematheque Limited</ChakraLink>
              </HStack>
            </Box>
            <Box>
              Website Designed and developed by{" "}
              <ChakraLink fontWeight="black">Konika Nahar</ChakraLink>
            </Box>
          </VStack>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            fontSize="xs"
          >
            <HStack justify="flex-start" gap="3">
              <Link to="/">
                <ChakraLink variant="underline">Privacy</ChakraLink>
              </Link>
              <Link to="/films">
                <ChakraLink variant="underline">Terms of Service</ChakraLink>
              </Link>
              <Link to="/lists">
                <ChakraLink variant="underline">Cookie Settings</ChakraLink>
              </Link>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
