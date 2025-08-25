import { Box, Flex, Text } from "@chakra-ui/react";
export const Header = () => {
  return (
    <Box className="headerbox1" bg="teal.500" px={6} py={4} color="white">
      <Flex align="center" justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          HeyChat
        </Text>
        {/* You can add nav links here */}
      </Flex>
    </Box>
  );
};
