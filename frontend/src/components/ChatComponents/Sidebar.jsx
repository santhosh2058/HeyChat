import {
  Avatar,
  Flex,
  HoverCard,
  IconButton,
  Portal,

} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react/tooltip";
import { SiGooglemessages } from "react-icons/si";
import { MdGroups, MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/authSlice";
import { clearChats } from "@/redux/chatSlice";

export const Sidebar = ({ setActiveSection }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(clearChats()); // clear chat state
    dispatch(logout()); // clear redux + localStorage
    navigate("/login"); // send user back to login page
  };
  return (
    <Flex
      direction="column"
      justify="space-between"
      alignItems="center"
      p={1}
      h="100vh"
      w="70px"
      bgColor="gray.100"
      border="1px solid"
      borderColor="gray.200"
    >
      {/*top*/}
      <Flex
        direction="column"
        align="center"
        gap={2}
        w="full"
        alignItems="center"
      >
        {/* Messages Button */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <HoverCard.Root
              openDelay={200}
              size="sm"
              positioning={{ placement: "right" }}
            >
              <HoverCard.Trigger asChild>
                <IconButton
                  onClick={() => setActiveSection("messages")}
                  color="black"
                  bgColor="gray.200"
                  borderRadius="full"
                >
                  <SiGooglemessages />
                </IconButton>
              </HoverCard.Trigger>
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content
                    maxWidth="240px"
                    bg="gray.900"
                    color="white"
                    p={1}
                    pl={4}
                    pr={4}
                    borderRadius="md"
                  >
                    Chat
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            </HoverCard.Root>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Messages
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Root>

        {/* Groups Button */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <HoverCard.Root
              openDelay={200}
              size="sm"
              positioning={{ placement: "right" }}
            >
              <HoverCard.Trigger asChild>
                <IconButton
                  onClick={() => setActiveSection("groups")}
                  color="black"
                  bgColor="gray.200"
                  borderRadius="full"
                >
                  <MdGroups />
                </IconButton>
              </HoverCard.Trigger>
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content
                    maxWidth="240px"
                    bg="gray.900"
                    color="white"
                    p={1}
                    pl={4}
                    pr={4}
                    borderRadius="md"
                  >
                    Groups
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            </HoverCard.Root>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Groups
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Root>
      </Flex>
      <Flex
        direction="column"
        align="center"
        gap={2}
        w="full"
        alignItems="center"
      >
        {/* settings Button */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <HoverCard.Root
              openDelay={200}
              size="sm"
              positioning={{ placement: "right" }}
            >
              <HoverCard.Trigger asChild>
                <IconButton
                  onClick={handleLogout}
                  color="red"
                  bgColor="red.200"
                  borderRadius="full"
                >
                  <MdOutlineLogout />
                </IconButton>
              </HoverCard.Trigger>
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content
                    maxWidth="240px"
                    bg="gray.900"
                    color="white"
                    p={1}
                    pl={4}
                    pr={4}
                    borderRadius="md"
                  >
                    Logout
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            </HoverCard.Root>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Logout
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Root>

        {/* profile */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <HoverCard.Root
              openDelay={200}
              size="sm"
              positioning={{ placement: "right" }}
            >
              <HoverCard.Trigger asChild>
                <IconButton
                  onClick={() => setActiveSection("profile")}
                  color="black"
                  bgColor="gray.200"
                  borderRadius="full"
                >
                  <Avatar.Root shape="full" size="lg">
                    <Avatar.Fallback name={user.name} />
                    <Avatar.Image src={user.pic} />
                  </Avatar.Root>
                </IconButton>
              </HoverCard.Trigger>
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content
                    maxWidth="240px"
                    bg="gray.900"
                    color="white"
                    p={1}
                    pl={4}
                    pr={4}
                    borderRadius="md"
                  >
                    Profile
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            </HoverCard.Root>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Profile
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Root>
      </Flex>
    </Flex>
  );
};
