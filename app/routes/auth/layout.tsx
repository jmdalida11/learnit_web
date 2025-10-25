import { Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <Flex
      minH="100vh"
      align={{ base: "flex-start", md: "center" }}
      justify="center"
      p={{ base: 4, md: 8 }}
    >
      <Container maxW={{ base: "100%", sm: "90%", md: "600px", lg: "800px" }}>
        <Outlet />
      </Container>
    </Flex>
  );
}
