import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
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
        <>
          <AuthForms />
        </>
      ) : (
                  <Flex textAlign={'center'} flexDirection={'column'} pr={'5'} pl={'5'}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={'12'} p={'5'}>
                      <Heading color={'blue.400'} display={['none', 'block', 'block', 'block', 'block']}>
                        Expense Tracker
                      </Heading>
                      <Button onClick={logout}>Log Out</Button>
                      <Flex alignItems={'center'}>
                        <Button onClick={onOpen} bg={'blue.500'} color={'black'} ml={'4'}>
                          Add new transaction
                        </Button>
                      </Flex>
                    </Flex>
                    <Summary totalExpense={totalExpense} totalIncome={totalIncome} />
                    <TransactionForm isOpen={isOpen} onClose={onClose} />
                    <Flex w={'full'} alignItems={'flex-start'} justifyContent={'space-evenly'} flexDirection={['column','column','column','row','row']}>
                      <View data={allTransactions.filter(item => item.type === 'expense')} type={'expense'} />
                      <View data={allTransactions.filter(item => item.type === 'income')} type={'income'} />
                    </Flex>
                  </Flex>
            )}
    </>
  );
}
