import { Footer } from "@/PageComponents/Footer";
import { Header } from "@/PageComponents/Header";
import { Login } from "@/PageComponents/Login";
import {
  Flex
} from "@chakra-ui/react";

export const LoginPage = () => {
  return (
    <Flex className="homeflex1" direction="column" minH="100vh">
      <Header />
      <Login />
      <Footer />
    </Flex>
  );
};
