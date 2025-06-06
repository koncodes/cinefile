import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";



const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Box>
        <Heading>Oops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpeted error has occurred."}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
