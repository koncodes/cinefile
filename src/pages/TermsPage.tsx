import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <VStack alignItems="flex-start" gap="5">
      <Heading as="h1" size="4xl" marginBottom={2}>
        Terms of Service
      </Heading>
      <VStack alignItems="flex-start" paddingTop="4">
        By accessing and using cinefile.com (the “Site” or “we”), you accept and
        agree to be bound by the following terms and conditions (“Terms”):
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Use</Heading>
        <Text>
          You may only use the Site in accordance with these Terms. All rights
          not expressly granted to you in these Terms are reserved by us.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Responsibility</Heading>
        <Text>
          You will be responsible for all activity that occurs as a result of
          your use of the Site. We disclaim any and all liability (including for
          negligence) for the content, opinions, statements or other information
          posted to, or the use of, the Site by its users.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Community Policy</Heading>
        <Text>
          You must be courteous and respectful of others’ opinions, and you must
          not post unwelcome, aggressive, suggestive or otherwise inappropriate
          remarks directed at another member of the Service.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Conduct</Heading>
        <Text>
          You must not use the Service to promote, engage in or incite hate,
          violence, discrimination or intolerance, including based on race, age,
          gender, gender identity, ethnicity, religion, disability, sexual
          orientation or other protected attribute. We reserve the right to
          remove content that has the potential to harm communities we consider
          worthy of protection.
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Heading>Personal Info</Heading>
        <Text>
          Your submission of personal information through the Site is governed
          by our Privacy Policy. View our{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </Text>

        <Text>Last updated: March 25, 2025</Text>
      </VStack>
    </VStack>
  );
};

export default TermsPage;
