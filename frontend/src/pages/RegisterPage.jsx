import { Footer } from "@/PageComponents/Footer";
import { Header } from "@/PageComponents/Header";
import { Register } from "@/PageComponents/Register";
import { Flex } from "@chakra-ui/react";

export const RegisterPage = () => {
  return (
    <Flex className="homeflex1" direction="column" minH="100vh">
      <Header />
      <Register />
      <Footer />
    </Flex>
  );
};
