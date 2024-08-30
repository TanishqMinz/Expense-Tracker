import { useState } from "react";
import LoginForm from "../login-form";
import RegisterForm from "../register-form";
import { Box, VStack } from "@chakra-ui/react";

export default function AuthForms() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Box>
      <VStack spacing={4}>
        {isRegistering ? (
          <RegisterForm onToggleForm={() => setIsRegistering(false)} />
        ) : (
          <LoginForm onToggleForm={() => setIsRegistering(true)} />
        )}
      </VStack>
    </Box>
  );
}
