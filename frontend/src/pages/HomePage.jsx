import { Flex } from "@chakra-ui/react";
import { Header } from "../components/PageComponents/Header";
import { Footer } from "../components/PageComponents/Footer";
import { Home } from "@/components/PageComponents/Home";

export const HomePage = () => {
  return (
    <Flex className="homeflex1" direction="column" minH="100vh">
      <Header />
      <Home/>
      <Footer />
    </Flex>
  );
};
