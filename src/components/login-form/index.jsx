import { useState, useContext } from "react";
import { GlobalContext } from "../../context";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Heading,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";

export default function LoginForm() {
  const { login } = useContext(GlobalContext);
  const [email, setEmail] = useState("janedoe@gmail.com");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState("");
  const toast = useToast();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Box
      bg="gray.50"
      p={8}
      borderRadius="md"
      boxShadow="lg"
      width="800px"
      maxW="md"
      mx="auto"
      mt={10}
    >
      <VStack spacing={4}>
        <Heading size="lg" color="blue.600">
          Login
        </Heading>
        <Text fontSize="md" color="gray.500">
          Please enter your credentials to continue
        </Text>

        <FormControl isInvalid={!!error}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            focusBorderColor="blue.500"
            borderColor="gray.300"
          />
          <FormLabel mt={4}>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            focusBorderColor="blue.500"
            borderColor="gray.300"
          />
          {error && (
            <FormErrorMessage mt={2}>{error}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleLogin}
          width="full"
          mt={6}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
}
