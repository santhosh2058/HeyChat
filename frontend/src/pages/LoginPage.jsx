import { Footer } from "@/PageComponents/Footer";
import { Header } from "@/PageComponents/Header";
import { Login } from "@/PageComponents/login";
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
