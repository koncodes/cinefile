import SwitchCard from "@/components/SwitchCard";
import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const CookiePage = () => {
  return (
    <VStack alignItems="flex-start" gap="5">
      <Heading as="h1" size="4xl" marginY={2}>
        Cookie Settings
      </Heading>
      <Text>
        Cookies are used to perform essential website functions and provide
        specific services such as persistent user authentication and retriving
        browser information to deliver a more optimized experience.
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="5" paddingTop="4">
        <SwitchCard disabled={true} on={true}>
          <VStack gap="3" alignItems="start">
            <Heading size="md">Necessary</Heading>
            <Text fontSize={"sm"}>
              Neccesary Cookies enable core functionality such as security,
              network management, and accessibility. You may disable these by
              changing your browser settings, but this may affect how the
              website functions.
            </Text>
          </VStack>
        </SwitchCard>
        <SwitchCard on={true}>
          <VStack gap="3" alignItems="start">
            <Heading size="md">Necessary</Heading>
            <Text fontSize={"sm"}>
              Neccesary Cookies enable core functionality such as security,
              network management, and accessibility. You may disable these by
              changing your browser settings, but this may affect how the
              website functions.
            </Text>
          </VStack>
        </SwitchCard>
        <SwitchCard on={true}>
          <VStack gap="3" alignItems="start">
            <Heading size="md">Preferences</Heading>
            <Text fontSize={"sm"}>
              Preference cookies are used to store settings and information that
              change the way the website appears or behaves, such as your
              preferred language or the region that you are in.
            </Text>
          </VStack>
        </SwitchCard>
        <SwitchCard on={true}>
          <VStack gap="3" alignItems="start">
            <Heading size="md">Analytics</Heading>
            <Text fontSize={"sm"}>
              Marketing cookies help us provide our visitors with relevant
              content, browsing history, and product recommendations.
            </Text>
          </VStack>
        </SwitchCard>
      </SimpleGrid>
    </VStack>
  );
};

export default CookiePage;
