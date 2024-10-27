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
import { FaUserPlus } from "react-icons/fa";

export default function RegisterForm({onToggleForm}) {
  const { register } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  async function handleRegister(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(email, password);
      toast({
        title: "Registration successful",
        description: "You can now log in.",
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
          <Icon as={FaUserPlus} w={12} h={12} color="green.500" />
          <Heading size="lg" color="blue.600">
            Create an Account
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center">
            Start tracking your expenses by creating an account
          </Text>

          <FormControl isInvalid={!!error}>
            <FormLabel fontWeight="semibold" mt={4}>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="green.500"
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
              focusBorderColor="green.500"
              borderColor="gray.300"
              variant="filled"
              size="lg"
            />
            <FormLabel fontWeight="semibold" mt={4}>Confirm Password</FormLabel>
            <Input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm your password"
              focusBorderColor="green.500"
              borderColor="gray.300"
              variant="filled"
              size="lg"
            />
            {error && <FormErrorMessage mt={2}>{error}</FormErrorMessage>}
          </FormControl>

          <Button
            colorScheme="green"
            onClick={handleRegister}
            width="full"
            size="lg"
            mt={6}
            _hover={{ bg: "green.600" }}
          >
            Register
          </Button>
          <Text fontSize="sm" color="gray.600" mt={4}>
              Already have an account?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={onToggleForm} 
              >
                Login
              </Button>
            </Text>
        </VStack>
      </Box>
    </ScaleFade>
  );
}
