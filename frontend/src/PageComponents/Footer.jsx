import { Box, Text } from "@chakra-ui/react";
export const Footer = () => {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      w="100%"
      bg="gray.800"
      color="white"
      textAlign="center"
      py={3}
      zIndex="999"
    >
      <Text fontSize="sm">
        © {new Date().getFullYear()} HeyChat. All rights reserved.
      </Text>
    </Box>
  );
};
