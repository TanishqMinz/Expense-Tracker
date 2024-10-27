import { Box, Flex, Heading, Text, IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, Stack } from "@chakra-ui/react";
import { useState, useContext, useRef } from "react"; // Added useRef
import { GlobalContext } from "../../context";
import { DeleteIcon } from "@chakra-ui/icons";

export default function View({ type }) {
  const { allTransactions, deleteTransaction, deleteAllTransactions } = useContext(GlobalContext);
  const filteredTransactions = allTransactions.filter(transaction => transaction.type === type);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteAll, setDeleteAll] = useState(false);

  const cancelRef = useRef(); // Added ref for leastDestructiveRef

  function handleDelete(id) {
    setDeleteId(id);
    setDeleteAll(false);
    setIsOpen(true);
  }

  function handleDeleteAll() {
    setDeleteId(null);
    setDeleteAll(true);
    setIsOpen(true);
  }

  async function confirmDelete() {
    try {
      if (deleteAll) {
        await deleteAllTransactions(type);
      } else {
        await deleteTransaction(deleteId);
      }
    } catch (error) {
      console.error(deleteAll ? 'Failed to delete all transactions:' : 'Failed to delete transaction:', error);
      // Optionally show user feedback here
    }
    setIsOpen(false);
  }

  function cancelDelete() {
    setIsOpen(false);
  }

  return (
    <Box flex={1} w="full" bg="white" mr={4} mt={10} mb={5} p={6} pb={4} borderRadius="12px" boxShadow="lg">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md" color={type === "income" ? "blue.700" : "red.700"}>
          {type === "income" ? "Income" : "Expense"}
        </Heading>
        <Button colorScheme="red" variant="outline" onClick={handleDeleteAll}>
          Delete All
        </Button>
      </Flex>

      <Stack spacing={3}>
        {filteredTransactions.map(item => (
          <Flex
            key={item.id}
            bg={type === "expense" ? "red.50" : "blue.50"}
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor={type === "expense" ? "red.200" : "blue.200"}
            alignItems="center"
            justifyContent="space-between"
            _hover={{ transform: "scale(1.02)", boxShadow: "md" }}
            transition="transform 0.2s ease, box-shadow 0.2s ease"
          >
            <Text fontWeight="semibold" color="gray.700">
              {item.description}
            </Text>
            <Text fontSize="lg" color={type === "income" ? "blue.600" : "red.600"} fontWeight="bold">
              {item.amount.toFixed(2)}
            </Text>
            <IconButton
              aria-label="Delete transaction"
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="ghost"
              onClick={() => handleDelete(item.id)}
              _hover={{ bg: "red.100" }}
            />
          </Flex>
        ))}
      </Stack>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={cancelDelete}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {deleteAll ? `Delete All ${type === "income" ? "Income" : "Expense"} Transactions` : "Delete Transaction"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {deleteAll
                ? `Are you sure you want to delete all ${type === "income" ? "income" : "expense"} transactions?`
                : "Are you sure you want to delete this transaction?"}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancelDelete}>Cancel</Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
