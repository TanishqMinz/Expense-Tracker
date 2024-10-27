import { Button, Flex, Heading, Divider, Box, Text, useDisclosure } from "@chakra-ui/react";
import Summary from "../summary";
import View from "../view";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import TransactionForm from "../add-transactions";
import AuthForms from "../auth-forms";

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, totalExpense, totalIncome, allTransactions } = useContext(GlobalContext);

  return (
    <>
      {!user ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <AuthForms />
        </Box>
      ) : (
        <Flex
          textAlign="center"
          flexDirection="column"
          pr={5}
          pl={5}
          py={10}
          minHeight="100vh"
          bg="gray.50"
        >

          <Flex
            alignItems="center"
            justifyContent="space-between"
            p={5}
            mb={8}
            bg="blue.50"
            borderRadius="md"
            boxShadow="md"
          >
            <Heading size="lg" color="blue.700" fontWeight="bold">
              Expense Tracker
            </Heading>
            <Button onClick={logout} colorScheme="red">
              Log Out
            </Button>
            <Button
              onClick={onOpen}
              bg="blue.500"
              color="white"
              ml={4}
              _hover={{ bg: "blue.600" }}
              boxShadow="base"
            >
              Add New Transaction
            </Button>
          </Flex>

          <Box mb={8} bg="white" borderRadius="md" boxShadow="lg" p={5}>
            <Summary totalExpense={totalExpense} totalIncome={totalIncome} />
          </Box>

          <Flex
            w="full"
            alignItems="flex-start"
            justifyContent="space-evenly"
            flexDirection={['column', 'column', 'column', 'row', 'row']}
            mt={8}
            gap={6}
          >
            <View data={allTransactions.filter((item) => item.type === 'expense')} type="expense" />
            <View data={allTransactions.filter((item) => item.type === 'income')} type="income" />
          </Flex>

          <TransactionForm isOpen={isOpen} onClose={onClose} />
        </Flex>
      )}
    </>
  );
}
