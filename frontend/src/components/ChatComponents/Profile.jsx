import {
  Flex,
  Box,
  Text,
  Avatar,
  ScrollArea,
  Stack,
  DataList,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export const Profile = () => {
  //   const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <Flex
      direction="column"
      alignItems="center"
      h="100vh"
      w="500px"
      p={1}
      border="1px solid"
      borderColor="gray.200"
    >
      {/*Profile Header*/}
      <Box w="full" h="50px" p={2}>
        <Text fontSize="2xl" fontWeight="bold">
          Profile
        </Text>
      </Box>
      {/*Profile pic*/}
      {/*Profile info card*/}
      <Box w="full" flex="1" p={2} overflow="hidden">
        <ScrollArea.Root style={{ height: "100%", width: "100%" }}>
          <ScrollArea.Viewport style={{ height: "100%" }}>
            <ScrollArea.Content>
              {/* Profile Picture */}
              <Box
                w="full"
                h="150px"
                pt={5}
                pb={5}
                display="flex"
                alignContent="center"
                justifyContent="center"
              >
                <Avatar.Root style={{ width: "100px", height: "100px" }}>
                  <Avatar.Fallback name={user.name} />
                  <Avatar.Image src={user.pic} />
                </Avatar.Root>
              </Box>
              <DataList.Root w="full" p={5} gap={5}>
                <DataList.Item>
                  <DataList.ItemLabel>Name</DataList.ItemLabel>
                  <DataList.ItemValue>{user.name}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Username</DataList.ItemLabel>
                  <DataList.ItemValue>{user.username}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Email</DataList.ItemLabel>
                  <DataList.ItemValue>{user.email}</DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </Box>
    </Flex>
  );
};
