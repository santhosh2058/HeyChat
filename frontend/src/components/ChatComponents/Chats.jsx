import { setSelectedChat } from "@/redux/chatSlice";
import { formatTime } from "@/utils/formatTime";
import { Avatar, Box, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

export const ChatItem = ({ chat }) => {
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const otherUser = !chat.isGroupChat
    ? chat.users.find((u) => u._id !== userId)
    : null;
    console.log(otherUser);
  //console.log(chat);
  const onClick = () => {
    // Handle chat item click
    dispatch(setSelectedChat(chat));
    console.log("Chat item clicked:", chat._id);
  };
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
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "gray.200" }}
    >
      {/* Avatar */}
      <Avatar.Root shape="full" size="lg">
        <Avatar.Image
          src={
            !chat.isGroupChat
              ? otherUser?.pic
              : undefined
          }
        />
        <Avatar.Fallback>
          {chat.isGroupChat
            ? chat.chatName[0].toUpperCase()
            : otherUser?.name?.[0]?.toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>

      <Flex direction="column" alignItems="center" w="full" p={1} pl={5}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          w="full"
        >
          <Text fontWeight="bold">
            {otherUser ? otherUser.name : "Unknown"}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatTime(chat.updatedAt)}
          </Text>
        </Flex>

        <Text fontSize="sm" w="full">
          {/* Last message preview */}
          {chat.latestMessage ? chat.latestMessage.content : "No messages yet"}
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
      <Flex direction="column" alignItems="center" flex="1" w="full" gap={1}>
        {chats.map((chat) => (
          <ChatItem key={chat._id} chat={chat} />
        ))}
      </Flex>
    </Flex>
  );
};
