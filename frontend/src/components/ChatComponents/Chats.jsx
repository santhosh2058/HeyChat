import { formatTime } from "@/utils/formatTime";
import { Avatar, Box, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";

export const ChatItem = ({ chat }) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      w="full"
      p={1}
      pl={2}
      pt={2}
      bgColor="gray.100"
      borderRadius="xl"
    >
      {/* Avatar */}
      <Avatar.Root shape="full" size="lg">
        <Avatar.Fallback name="UserChat" />
        <Avatar.Image />
      </Avatar.Root>

      <Flex direction="column" alignItems="center" w="full" p={1} pl={5}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          w="full"
        >
          <Text fontWeight="bold">{chat.chatName}</Text>
          <Text fontSize="xs" color="gray.500">
            {formatTime(chat.updatedAt)}
          </Text>
        </Flex>

        <Text fontSize="sm" w="full">
          no message
        </Text>
      </Flex>
    </Flex>
  );
};

export const Chats = () => {
  const { chats } = useSelector((state) => state.chat);
  return (
    <Flex
      direction="column"
      alignItems="center"
      p={1}
      h="100vh"
      w="500px"
      border="1px solid"
      borderColor="gray.200"
    >
      {/* Hey Chat Header */}
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        p={1}
        pl={2}
      >
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="teal">
            Hey Chat
          </Text>
        </Box>
      </Flex>

      {/* Search Input */}
      <Box w="full" p={1} pl={2}>
        <InputGroup flex="1" startElement={<LuSearch />} borderRadius="90%">
          <Input placeholder="Search contacts" />
        </InputGroup>
      </Box>

      {/* Chat List */}

      {chats.map((chat) => (
        <ChatItem key={chat._id} chat={chat} />
      ))}
    </Flex>
  );
};
