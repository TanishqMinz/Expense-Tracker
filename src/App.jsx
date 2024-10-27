import { Box, Container, Flex } from "@chakra-ui/react";
import Main from "./components/main";

function App() {
  return (
    <Container maxW={'100%'} height={'100vh'} p={0}>
      <Flex height="100%" flexDirection="column" justifyContent="stretch">
        <Box flex={1} boxShadow="md" borderRadius="md">
          <Main />
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
