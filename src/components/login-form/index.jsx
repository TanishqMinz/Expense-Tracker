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
  ScaleFade,
  Icon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export default function LoginForm({onToggleForm}) {
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
        title: "Welcome back!",
        description: "You have logged in successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <ScaleFade initialScale={0.9} in>
      <Box
        bg="gray.50"
        p={10}
        borderRadius="lg"
        boxShadow="lg"
        width={["sm", null, "md"]}
        maxW="md"
        mx="auto"
        mt={10}
      >
        <VStack spacing={6}>
          <Icon as={FaUser} w={12} h={12} color="blue.500" />
          <Heading size="lg" color="blue.600">
            Login to Your Account
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center">
            Access your expense tracker by entering your credentials
          </Text>

          <FormControl isInvalid={!!error}>
            <FormLabel fontWeight="semibold" mt={4}>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="blue.500"
              borderColor="gray.300"
              variant="filled"
              size="lg"
            />
            <FormLabel fontWeight="semibold" mt={4}>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="blue.500"
              borderColor="gray.300"
              variant="filled"
              size="lg"
            />
            {error && <FormErrorMessage mt={2}>{error}</FormErrorMessage>}
          </FormControl>

          <Button
            colorScheme="blue"
            onClick={handleLogin}
            width="full"
            size="lg"
            mt={6}
            _hover={{ bg: "blue.600" }}
          >
            Login
          </Button>
          <Text fontSize="sm" color="gray.600" mt={4}>
            Don’t have an account?{" "}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={onToggleForm} 
            >
              Register
            </Button>
          </Text>
        </VStack>
      </Box>
    </ScaleFade>
  );
}
