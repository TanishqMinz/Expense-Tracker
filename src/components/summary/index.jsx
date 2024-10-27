import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TransactionForm from "../add-transactions";
import TransactionChartSummary from "../chart";
import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function Summary({ onClose, isOpen }) {
  const { totalIncome, totalExpense } = useContext(GlobalContext);
  const balance = totalIncome - totalExpense;

  return (
    <Box
      p={6}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      background="white"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading size="lg" mb={4} color="blue.700" textAlign="center" fontWeight="bold">
        Balance: {balance}
      </Heading>
      <Flex
        justifyContent="space-around"
        alignItems="center"
        bg="gray.50"
        w="100%"
        h="120px"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="md"
        mt={4}
        p={4}
        boxShadow="sm"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex="1"
        >
          <Heading color="red.700">{totalExpense}</Heading>
          <Text color="gray.600">Total Expense</Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex="1"
        >
          <Heading color="blue.700">{totalIncome}</Heading>
          <Text color="gray.600">Total Income</Text>
        </Flex>
      </Flex>
      <Box
        mt={6}
        width={{ base: '100%', md: '400px' }}
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="sm"
      >
        <TransactionChartSummary />
      </Box>
      <TransactionForm onClose={onClose} isOpen={isOpen} />
    </Box>
  );
}
