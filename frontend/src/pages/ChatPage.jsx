import { ChatContent } from "@/components/ChatComponents/ChatContent";
import { Chats } from "@/components/ChatComponents/Chats";
import { Profile } from "@/components/ChatComponents/Profile";
import { ProfilePicture } from "@/components/ChatComponents/ProfilePicture";
import { Sidebar } from "@/components/ChatComponents/Sidebar";
import { fetchChats } from "@/redux/chatSlice";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chat);

  const [activeSection, setActiveSection] = useState("messages");

  useEffect(() => {
    if (token && chats.length === 0) {
      dispatch(fetchChats(token));
    }
  }, [token, chats.length, dispatch]);
  return (
    <Stack direction="row" h="100vh" gap={0}>
      {/* Sidebar gets the setter */}
      <Sidebar setActiveSection={setActiveSection} />

      {/* Conditional rendering */}
      {activeSection === "messages" && (
        <>
          <Chats />
          <ChatContent />
        </>
      )}
      {activeSection === "settings" && <Setting />}
      {activeSection === "profile" && (
        <>
          <Profile />
          <ProfilePicture />
        </>
      )}
    </Stack>
  );
};
