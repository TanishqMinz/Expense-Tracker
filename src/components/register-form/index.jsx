import { useContext, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Box,
  Heading,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { GlobalContext } from "../../context";

export default function RegisterForm() {
  const { register } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await register(email, password);
      toast({
        title: "Registration successful",
        description: "You have successfully registered!",
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
      width={["sm", null, "md"]}
      maxW="md"
      mx="auto"
      mt={10}
    >
      <VStack spacing={4}>
        <Heading size="lg" color="blue.600">
          Register
        </Heading>
        <Text fontSize="md" color="gray.500">
          Create your account
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
          onClick={handleRegister}
          width="full"
          mt={6}
        >
          Register
        </Button>
      </VStack>
    </Box>
  );
}
