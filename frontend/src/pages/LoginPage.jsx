import { Footer } from "@/components/PageComponents/Footer";
import { Header } from "@/components/PageComponents/Header";
import { Login } from "@/components/PageComponents/Login";
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
