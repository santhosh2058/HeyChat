import { createMessage, fetchMessages } from "@/redux/messagesSlice";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  ScrollArea,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowDown } from "react-icons/lu";
import { useStickToBottom } from "use-stick-to-bottom";
import { socket } from "@/socket";
import { formatTime } from "@/utils/formatTime";

export const ChatContent = () => {
  const sticky = useStickToBottom();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages) || [];

  // Connect socket when component mounts
  useEffect(() => {
    socket.auth = { token, userId };
    socket.connect();

    // Listen for incoming messages
    socket.on("receive_message", (msg) => {
      if (msg.chatId === selectedChat?._id) {
        // Only update messages for current chat
        dispatch({ type: "messages/addMessage", payload: msg });
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [dispatch, token, userId, selectedChat]);

  // Join room whenever selectedChat changes
  useEffect(() => {
    if (selectedChat?._id) {
      socket.emit("join_chat", selectedChat._id);
    }
  }, [selectedChat]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Add message locally for instant feedback
    dispatch({
      type: "messages/addMessage",
      payload: {
        chat: selectedChat._id,
        content: trimmed,
        sender: { _id: userId },
        _id: Date.now(), // temporary ID until backend responds
      },
    });

    setInputValue("");

    // Send to backend (saved to DB)
    await dispatch(
      createMessage({ token, chatId: selectedChat._id, content: trimmed })
    ).unwrap();

    // Backend emits this via socket, so real-time updates happen automatically
  };

  useEffect(() => {
    if (selectedChat) {
      console.log("Fetching messages for chat:", selectedChat._id);
      dispatch(fetchMessages({ token, chatId: selectedChat._id }))
      .then(() => {
        // Scroll instantly after messages load
        // Direct DOM jump (0s, no animation)
        if (sticky.scrollRef.current) {
          const el = sticky.scrollRef.current;
          el.scrollTop = el.scrollHeight;
        }
      });
    }
  }, [selectedChat, dispatch, token]);

  if (selectedChat === null) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        p={0}
        h="100vh"
        w="full"
        border="1px solid"
        borderColor="gray.200"
      >
        {/* Hey Chat Header */}
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="center"
          w="full"
          h="100vh"
          p={1}
          pl={2}
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="teal">
              Welcome to Hey Chat
            </Text>
          </Box>
        </Flex>
      </Flex>
    );
  }
  console.log("Selected Chat:", selectedChat);

  const otherUser = !selectedChat.isGroupChat
    ? selectedChat.users.find((u) => u._id !== userId)
    : null;

  return (
    <Flex
      direction="column"
      alignItems="center"
      p={0}
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
        bgColor="blue.50"
      >
        {/* Avatar */}
        <Avatar.Root shape="full" size="lg">
          <Avatar.Image
            src={!selectedChat.isGroupChat ? otherUser?.pic : undefined}
          />
          <Avatar.Fallback>
            {selectedChat.isGroupChat
              ? selectedChat.chatName[0].toUpperCase()
              : otherUser?.name?.[0]?.toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>

        {/* Chat name */}
        <Text fontWeight="bold" fontSize="lg" color="gray.800" p={1} pl={2}>
          {selectedChat.isGroupChat ? selectedChat.chatName : otherUser?.name}
        </Text>
      </Flex>
      {/* Chat content */}
      <ScrollArea.Root h="full" w="full" flex="1" p={3} bg="#f2f2f2">
        <ScrollArea.Viewport ref={sticky.scrollRef}>
          <ScrollArea.Content ref={sticky.contentRef} spaceY="1" textStyle="sm">
            {/** Chat messages will go here */}
            {messages.length === 0 ? (
              <Text color="gray.500">No messages yet...</Text>
            ) : (
              messages.map((msg) => {
                const isSender = msg.sender._id === userId;
                return (
                  <Flex
                    key={msg._id}
                    justify={isSender ? "flex-end" : "flex-start"}
                    mb={2}
                  >
                    <Flex
                      maxW="70%"
                      bg={isSender ? "green.100" : "white"}
                      //color={userId === msg.sender._id ? "white" : "black"}
                      p={1}
                      borderRadius="lg"
                      borderBottomRightRadius={isSender ? "0" : "lg"}
                      borderBottomLeftRadius={isSender ? "lg" : "0"}
                      gap={1}
                    >
                      <Text pl={2} pt={2} pb={2}>{msg.content}</Text>
                      <Text pl={1} pt={4} fontSize="2xs" color="gray.500">
                        {formatTime(new Date(msg.createdAt), {
                          addSuffix: true,
                        })}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })
            )}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
        {!sticky.isAtBottom && (
          <Box position="absolute" bottom="4" right="4" zIndex="10">
            <IconButton
              size="sm"
              onClick={() => {
                sticky.scrollToBottom();
              }}
              colorScheme="blue"
              variant="solid"
            >
              <LuArrowDown />
            </IconButton>
          </Box>
        )}
      </ScrollArea.Root>
      {/* Typing message */}
      <Box w="full" p={1} pl={2}>
        <InputGroup
          endElement={
            <IconButton
              aria-label="Send message"
              onClick={handleSend}
              bg="green.500"
              size="sm"
              borderRadius="full"
              _hover={{ bg: "green.600" }}
            >
              <IoSend color="white" />
            </IconButton>
          }
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
        </InputGroup>
      </Box>
    </Flex>
  );
};
