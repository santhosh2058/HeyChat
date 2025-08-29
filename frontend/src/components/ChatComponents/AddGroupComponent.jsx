import { createGroupChat } from "@/redux/chatSlice";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Input,
  ScrollArea,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoArrowBack, IoSend } from "react-icons/io5";
import { MdDone } from "react-icons/md";

export const AddGroupComponent = ({
  chats,
  userId,
  selectedUsers,
  setSelectedUsers,
  setAvailableUsers,
  availableUsers,
  setAddGroup,
  setNewGroup,
  newGroup,
  inputValue,
  setInputValue,
  dispatch,
  token,
  onBack,
  onSuccess,
}) => {
  useEffect(() => {
    let others = [];
    chats.forEach((chat) => {
      if (chat.isGroupChat) {
        chat.users.forEach((u) => {
          if (u._id !== userId) others.push(u);
        });
      } else {
        const otherUser = chat.users.find((u) => u._id !== userId);
        if (otherUser) others.push(otherUser);
      }
    });

    // Deduplicate by id
    const uniqueUsers = Array.from(
      new Map(others.map((u) => [u._id, u])).values()
    );

    // Sort by name
    uniqueUsers.sort((a, b) => a.name.localeCompare(b.name));

    setAvailableUsers(uniqueUsers);
  }, [chats, userId, setAvailableUsers]);

  const addTag = (user) => {
    // Logic to add user to group
    setSelectedUsers((prev) => {
      // prevent duplicates
      const updated = [...prev, user];
      return Array.from(new Map(updated.map((u) => [u._id, u])).values());
    });
    setAvailableUsers((prev) => prev.filter((u) => u._id !== user._id));
  };
  const removeTag = (user) => {
    // Logic to remove user from group
    setSelectedUsers((prev) => prev.filter((u) => u._id !== user._id));
    setAvailableUsers((prev) => {
      const updated = [...prev, user];
      const unique = Array.from(
        new Map(updated.map((u) => [u._id, u])).values()
      );
      return unique.sort((a, b) => a.name.localeCompare(b.name));
    });
  };
  const handleAdd = () => {
    // Logic to add users to the group
    //setAddGroup(false);
    setNewGroup(true);
  };

  if (newGroup) {
    const handleBack = () => {
      setNewGroup(false);
      setAddGroup(true);
    };
    const handleNewGroup = async () => {
      try {
        // Dispatch async action
        await dispatch(
          createGroupChat({ users: selectedUsers, token, name: inputValue })
        );
        console.log("Group created successfully");
        onSuccess();
      } catch (err) {
        console.error("Error creating group:", err);
      }
    };

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
        {/**add group members txt */}
        <Flex direction="row" alignItems="center" w="full" p={1} pl={2}>
          <IconButton
            onClick={handleBack}
            aria-label="add new chat"
            bg="white"
            _hover={{ bg: "gray.200", borderRadius: "full" }}
          >
            <IoArrowBack style={{ color: "black" }} />
          </IconButton>
          <Box>
            <Text pl={2}>New Group</Text>
          </Box>
        </Flex>

        {/* New Group Info*/}
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <Flex
                direction="column"
                alignItems="center"
                w="full"
                p={1}
                pl={2}
                gap={1}
              >
                {/**upload group picture */}
                {/**group name */}
                <Box w="full" p={3}>
                  <Input
                    _placeholder={{ color: "gray.600" }}
                    placeholder="Group Name"
                    variant="flushed"
                    onChange={(e) => setInputValue(e.target.value)}
                    _focus={{ borderBottomColor: "green.500" }}
                  />
                </Box>
                <Flex
                  direction="row"
                  alignItems="center"
                  w="full"
                  p={1}
                  pl={2}
                  pt={2}
                  borderRadius="xl"
                  cursor="pointer"
                >
                  <Text pl={2} color="black">
                    Group Permissions
                  </Text>
                </Flex>
                <Flex
                  h="100px"
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    aria-label="New group"
                    onClick={handleNewGroup}
                    bg="green.500"
                    size="sm"
                    borderRadius="full"
                    _hover={{ bg: "green.600" }}
                  >
                    <MdDone color="white" />
                  </IconButton>
                </Flex>
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
  }

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
      {/**add group members txt */}
      <Flex direction="row" alignItems="center" w="full" p={1} pl={2}>
        <IconButton
          onClick={() => {
            onBack();
          }}
          aria-label="add new chat"
          bg="white"
          _hover={{ bg: "gray.200", borderRadius: "full" }}
        >
          <IoArrowBack style={{ color: "black" }} />
        </IconButton>
        <Box>
          <Text pl={2}>Add Group Members</Text>
        </Box>
      </Flex>
      {/**list of selected users with checkboxes */}
      <Wrap p={2} gap={2}>
        {selectedUsers.map((user) => (
          <WrapItem key={user._id}>
            <Tag.Root>
              <Tag.Label w="full">{user.name}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger onClick={() => removeTag(user)} />
              </Tag.EndElement>
            </Tag.Root>
          </WrapItem>
        ))}
      </Wrap>
      {/*search bar to search users */}
      <Box w="full" p={3}>
        <Input
          _placeholder={{ color: "gray.600" }}
          placeholder="Search Name"
          variant="flushed"
        />
      </Box>
      {/*list of unselected users on click of user add tag*/}
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <Flex
              direction="column"
              alignItems="center"
              w="full"
              p={1}
              pl={2}
              gap={1}
            >
              {availableUsers.map((user) => (
                <Flex
                  key={user._id}
                  direction="row"
                  alignItems="center"
                  w="full"
                  p={1}
                  pl={2}
                  pt={2}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => addTag(user)}
                  _hover={{ bg: "gray.200" }}
                >
                  {/* Avatar */}
                  <Avatar.Root shape="full" size="lg">
                    <Avatar.Image src={user.pic} />
                    <Avatar.Fallback>
                      {user.name?.[0]?.toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <Box>
                    <Text pl={2} color="black">
                      {user.name}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar bg="transparent">
          <ScrollArea.Thumb bg="gray.subtle" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>

      {/* submit */}
      {selectedUsers.length > 0 && (
        <Flex h="100px" w="full" alignItems="center" justifyContent="center">
          <IconButton
            aria-label="add to group"
            onClick={handleAdd}
            bg="green.500"
            size="sm"
            borderRadius="full"
            _hover={{ bg: "green.600" }}
          >
            <IoSend color="white" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
};
