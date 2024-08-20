import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TransactionForm from "../add-transactions";
import TransactionChartSummary from "../chart";
import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function Summary({ onClose, isOpen }) {
  const { totalIncome, totalExpense } = useContext(GlobalContext);

  return (
    <Box p={'6'} border={'1px solid'} borderColor={'gray.100'} overflow={'hidden'} borderRadius={'10'} background={'white'} display={'flex'} flexDirection="column" alignItems="center">
      <Heading size={'md'} mb={'4'} color={'gray.700'} textAlign="center">
        Balance: {totalIncome - totalExpense}
      </Heading>
      <Flex justifyContent={'space-around'} alignItems={'center'} bg={'gray.50'} w={'100%'} h={'100px'} border={'1px solid'} borderColor={'gray.100'} mt="4" p="2">
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} flex="1">
          <Heading color={'gray.700'}>{totalExpense}</Heading>
          <Text color={'gray.600'}>Total Expense</Text>
        </Flex>
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} flex="1">
          <Heading color={'gray.700'}>{totalIncome}</Heading>
          <Text color={'gray.600'}>Total Income</Text>
        </Flex>
      </Flex>
      <Box mt="4" width={'300px'} height={'300px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <TransactionChartSummary />
      </Box>
      <TransactionForm onClose={onClose} isOpen={isOpen} />
    </Box>
  );
}
