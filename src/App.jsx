import { Box, Container, Flex } from "@chakra-ui/react";
import Main from "./components/main";

function App() {
  return (
    <Container bg={'#D3D3D3'} maxW={'Container.3x1'} height={'100vh'} p={'0'}>
      <Flex height="100%" flexDirection="column" justifyContent="stretch">
        <Box flex={1} bg="#D3D3D3">
          <Main />
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
