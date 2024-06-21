import {Box,Container,Flex} from "@chakra-ui/react"
import './App.css';
import Main from "./components/main";

function App() {
  return (
    <Container bg={'#D3D3D3'} maxW={'Container.3x1'} height={'100vh'} p={'0'}>
      <Flex height = {'full'}>
        <Box height = {'full'} flex ={5} w={['20%','30%','20%','50%','60%']}>
          <Main></Main>
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
