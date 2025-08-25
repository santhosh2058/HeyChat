import { AbsoluteCenter, Box, Button, Container, Flex, Text } from "@chakra-ui/react";

//handle form submission
export const Home = () => {
  const handleButtonClick = (action) => {
    if (action === "login") {
      // Redirect to login page
      window.location.href = "/login";

    } else if (action === "signup") {
      // Redirect to signup page
      window.location.href = "/register";
    }
  };

  return (
    <Container w="400px" maxW="container.xl" py="8">
      <Box position="relative" h="100px" bg="bg.muted" borderRadius="md">
        <AbsoluteCenter>
          <Text fontSize="2xl" fontWeight="bold" color="primary">
            Hey Chat
          </Text>
        </AbsoluteCenter>
      </Box>
      <Flex w="full" gap="2" padding='2'>
        <Button
          flex="1"
          colorPalette="teal"
          variant="solid"
          onClick={() => handleButtonClick("login")}
        >
          login
        </Button>
        <Button
          flex="1"
          colorScheme="teal"
          variant="solid"
          onClick={() => handleButtonClick("signup")}
        >
          signup
        </Button>
      </Flex>
    </Container>
  );
};
