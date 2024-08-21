import { useState } from "react";
import LoginForm from "../login-form";
import RegisterForm from "../register-form";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

export default function AuthForms() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Box>
      <VStack spacing={4}>
        {isRegistering ? (
          <>
            <RegisterForm />
            <Text>
              Already have an account?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setIsRegistering(false)}
              >
                Login
              </Button>
            </Text>
          </>
        ) : (
          <>
            <LoginForm />
            <Text>
              Don’t have an account?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setIsRegistering(true)}
              >
                Register
              </Button>
            </Text>
          </>
        )}
      </VStack>
    </Box>
  );
}
