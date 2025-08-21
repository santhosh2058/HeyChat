import { Flex } from "@chakra-ui/react";
import { Header } from "../PageComponents/Header";
import { Footer } from "../PageComponents/Footer";
import { Home } from "@/PageComponents/Home";

export const HomePage = () => {
  return (
    <Flex className="homeflex1" direction="column" minH="100vh">
      <Header />
      <Home/>
      <Footer />
    </Flex>
  );
};
