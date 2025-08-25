import { Footer } from "@/components/PageComponents/Footer";
import { Header } from "@/components/PageComponents/Header";
import { Register } from "@/components/PageComponents/Register";
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
