import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const PrivacyPage = () => {
  return (
    <VStack alignItems="flex-start" gap="5">
      <Heading as="h1" size="4xl" marginBottom={2}>
        Privacy Policy
      </Heading>
      <VStack alignItems="flex-start" paddingTop="4">
        This Privacy Policy describes how cinefile.com (the “Site” or “we”)
        collects, uses, and discloses your personal information when you visit
        or engage with the Site.
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Collecting Personal Information</Heading>
        <Text>
          When you use the Site to search for movies, search queries and the
          resulting data using from The Movie Database (TMDB) are temporarily
          cached locally on your device using React Query's caching mechanism.
          This information is stored directly on your device and is not
          transmitted to us or any third party. Please consult TMDB's terms of
          service for their own usage policy.
        </Text>
        <Text>
          Users who choose to create an account on Cinefile consent to their
          authtentican data being stored as well as any other information the
          user chooses to share.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Sharing Personal Information</Heading>
        <Text>
          No personal information will be shared or distributed to third parties
          except if required by lawful request or to otherwise protect our
          rights.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Using Personal Information</Heading>
        <Text>
          The personal information you provide us will only be used in relation
          to the services we provide you, to communicate with you in relation to
          our services or to cooperate with any government or regulatory
          authorities.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Lawful Basis</Heading>
        <Text>
          Pursuant to the General Data Protection Regulation (“GDPR”), if you
          are a resident of the European Economic Area (“EEA”), we process your
          personal information under the following lawful bases:
        </Text>
        <Box as="ul" listStyleType="circle" listStylePosition="inside">
          <li>Your consent;</li>
          <li>The performance of the contract between you and the Site;</li>
          <li>
            For our legitimate interests, which do not override your fundamental
            rights and freedoms.
          </li>
        </Box>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Changes to This Policy</Heading>
        <Text>
          We may update this Privacy Policy at our discretion. Continued use of
          Cinefile after updates constitutes acceptance of the changes.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Contact</Heading>
        <Text>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at support@cinefile.com.
        </Text>

        <Text>Last updated: March 25, 2025</Text>
      </VStack>
    </VStack>
  );
};

export default PrivacyPage;
