import { Avatar, Box, Flex, Input, InputGroup, Kbd, Text } from "@chakra-ui/react";

export const ChatContent = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      p={1}
      h="100vh"
      w="full"
      border="1px solid"
      borderColor="gray.200"
    >
      <Flex
        direction="row"
        alignItems="center"
        w="full"
        p={2}
        pl={2}
        pt={2}
        bgColor="gray.100"
      >
        {/* Avatar */}
        <Avatar.Root shape="full" size="lg">
          <Avatar.Fallback name="Random User" />
          <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
        </Avatar.Root>
      </Flex>
      {/*typing message*/}
      <Box w="full" p={1} pl={2}>
        <InputGroup flex="1"   borderRadius="90%" endElement={<Kbd>enter</Kbd>}>
          <Input  placeholder="Type a message" />
        </InputGroup>
      </Box>
    </Flex>
  );
};
