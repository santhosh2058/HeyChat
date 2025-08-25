import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { HiUserCircle } from "react-icons/hi";
import { LuFileX2 } from "react-icons/lu";

export const ProfilePicture = () => {
  return (
    <Flex
      h="100vh"
      w="full"
      direction="column"
      border="1px solid"
      bgColor="gray.100"
      borderColor="gray.200"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Icon as={HiUserCircle} boxSize="100px" color="gray.400" />
      <Text color="gray.600" fontSize="2xl" >
        Profile
      </Text>
    </Flex>
  );
};
