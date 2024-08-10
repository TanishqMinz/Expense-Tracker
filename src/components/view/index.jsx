import { Box, Flex, Heading, Text, IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context";
import { DeleteIcon } from "@chakra-ui/icons";

export default function View({ type }) {
  const { allTransactions, deleteTransaction, deleteAllTransactions } = useContext(GlobalContext);
  const filteredTransactions = allTransactions.filter(transaction => transaction.type === type);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteAll, setDeleteAll] = useState(false);

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
    if (deleteAll) {
      try {
        await deleteAllTransactions(type);
      } catch (error) {
        console.error('Failed to delete all transactions:', error);
      }
    } else {
      try {
        await deleteTransaction(deleteId);
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
    setIsOpen(false);
  }

  function cancelDelete() {
    setIsOpen(false);
  }

  return (
    <Box flex={1} w='full' bg={'white'} mr={'4'} mt={'10'} p={'5'} pb={'4'} border={'1px solid'} borderColor={'gray.100'} borderRadius={'12'} mb="4">
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'md'} color={type === 'income' ? 'blue.700' : 'red.700'}>
          {type === 'income' ? 'Income' : 'Expense'}
        </Heading>
        <Button colorScheme="red" onClick={handleDeleteAll}>
          Delete All Transactions
        </Button>
      </Flex>
      {
        filteredTransactions.map(item => (
          <Flex
            key={item.id}
            bg={type === 'expense' ? 'red.50' : 'blue.50'}
            mt={'4'}
            justifyContent={'space-between'}
            alignItems={'center'}
            border={'1px solid'}
            borderColor={type === 'expense' ? 'red.100' : 'blue.100'}
            p={'4'}
            borderRadius={'8'}
            mb="3" 
          >
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Text ml={'3'} fontWeight={'bold'} color={'gray.600'}>{item.description}</Text>
            </Flex>
            <Text>{item.amount}</Text>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => handleDelete(item.id)}
            />
          </Flex>
        ))
      }
      <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {deleteAll ? `Delete All ${type === 'income' ? 'Income' : 'Expense'} Transactions` : 'Delete Transaction'}
            </AlertDialogHeader>
            <AlertDialogBody>
              {deleteAll
                ? `Are you sure you want to delete all ${type === 'income' ? 'income' : 'expense'} transactions?`
                : 'Are you sure you want to delete this transaction?'}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={cancelDelete}>Cancel</Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
