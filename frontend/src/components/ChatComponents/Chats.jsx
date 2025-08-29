import { setSelectedChat } from "@/redux/chatSlice";
import { formatTime } from "@/utils/formatTime";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  ScrollArea,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { MdGroupAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AddGroupComponent } from "./AddGroupComponent";

export const ChatItem = ({ chat }) => {
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const otherUser = !chat.isGroupChat
    ? chat.users.find((u) => u._id !== userId)
    : null;
  //console.log(otherUser);
  //console.log(chat);
  const onClick = () => {
    // Handle chat item click
    dispatch(setSelectedChat(chat));
    //console.log("Chat item clicked:", chat._id);
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
        <Avatar.Image src={!chat.isGroupChat ? otherUser?.pic : undefined} />
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
            {chat.isGroupChat
              ? chat.chatName
              : otherUser
                ? otherUser.name
                : "Unknown"}
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

export const Chats = ({ isGroup }) => {
  const { chats } = useSelector((state) => state.chat);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user._id);
  let [newChat, setNewChat] = useState(false);
  let [addUser, setAddUser] = useState(false);
  let [addGroup, setAddGroup] = useState(false);
  let [newGroup, setNewGroup] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial data or perform setup
  }, []);

  const handleAddNewChat = () => {
    // Handle adding a new chat
    setNewChat(true);
  };
  const handleNewUser = () => {
    // Handle adding a new user
    setAddUser(true);
  };
  const handleNewGroup = () => {
    // Handle adding a new group
    setNewChat(false);
    setAddGroup(true);
  };

  //adding new chat
  if (newChat) {
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
        {/**back btn */}
        {/**new chat txt */}
        <Flex direction="row" alignItems="center" w="full" p={1} pl={2}>
          <IconButton
            onClick={() => setNewChat(false)}
            aria-label="add new chat"
            bg="white"
            _hover={{ bg: "gray.200", borderRadius: "full" }}
          >
            <IoArrowBack style={{ color: "black" }} />
          </IconButton>
          <Box>
            <Text pl={2}>New Chat</Text>
          </Box>
        </Flex>
        {/**new group btn */}
        {/**new user btn*/}
        <Flex
          direction="column"
          alignItems="center"
          w="full"
          p={1}
          pl={2}
          gap={2}
        >
          <Button
            w="full"
            bgColor="white"
            borderRadius="xl"
            onClick={handleNewGroup}
            _hover={{ bg: "gray.200" }}
          >
            <Flex direction="row" alignItems="center" w="full">
              <MdGroupAdd style={{ color: "green" }} />
              <Box>
                <Text pl={2} color="black">
                  New Group
                </Text>
              </Box>
            </Flex>
          </Button>

          <Button
            w="full"
            bgColor="white"
            borderRadius="xl"
            onClick={handleNewUser}
            _hover={{ bg: "gray.200" }}
          >
            <Flex direction="row" alignItems="center" w="full">
              <MdGroupAdd style={{ color: "green" }} />
              <Box>
                <Text pl={2} color="black">
                  New User
                </Text>
              </Box>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    );
  }

  //adding new user
  if (addUser) {
    //logic for adding new user
  }
  if (addGroup) {
    return (
      <AddGroupComponent
        chats={chats}
        userId={userId}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        setAvailableUsers={setAvailableUsers}
        availableUsers={availableUsers}
        setAddGroup={setAddGroup}
        setNewGroup={setNewGroup}
        newGroup={newGroup}
        inputValue={inputValue}
        setInputValue={setInputValue}
        dispatch={dispatch}
        token={token}
        onBack={() => {
          setAddGroup(false);
          setNewChat(true);
          setSelectedUsers([]);
          setAvailableUsers([]);
          setInputValue("");
        }}
        onSuccess={() => {
          setAddGroup(false);
          setNewChat(false);
          setSelectedUsers([]);
          setAvailableUsers([]);
          setInputValue("");
        }}
      />
    );
  }

  const filteredChats = isGroup
    ? chats.filter((c) => c.isGroupChat) // only groups
    : chats; // all chats
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
        <IconButton
          onClick={handleAddNewChat}
          aria-label="add"
          bg="white"
          pt={3}
        >
          <BiCommentAdd style={{ color: "black" }} />
        </IconButton>
      </Flex>

      {/* Search Input */}
      <Box w="full" p={1} pl={2}>
        <InputGroup flex="1" startElement={<LuSearch />} borderRadius="90%">
          <Input placeholder="Search contacts" />
        </InputGroup>
      </Box>

      {/* Chat List */}
      <ScrollArea.Root>
        <ScrollArea.Viewport style={{ paddingRight: "14px" }}>
          <ScrollArea.Content>
            <Flex
              direction="column"
              alignItems="center"
              flex="1"
              w="full"
              gap={1}
            >
              {filteredChats.map((chat) => (
                <ChatItem key={chat._id} chat={chat} />
              ))}
            </Flex>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar bg="transparent">
          <ScrollArea.Thumb bg="gray.subtle" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </Flex>
  );
};
