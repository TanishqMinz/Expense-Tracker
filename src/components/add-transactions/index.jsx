import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, RadioGroup, Radio, Button, FormErrorMessage } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context";

export default function TransactionForm({ onClose, isOpen }) {
  const { formData, setFormData, handleFormSubmit } = useContext(GlobalContext);
  const [error, setError] = useState('');

  function handleFormChange(event) {
    const { name, value } = event.target;
    if (name === 'amount' && value < 0) {
      setError('Amount cannot be negative');
    } else {
      setError('');
    }
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleTypeChange(value) {
    setFormData({
      ...formData,
      type: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.amount <= 0) {
      setError('Amount must be greater than zero');
      return;
    }
    handleFormSubmit(formData); 
    setFormData({ type: 'income', amount: 0, description: "" }); 
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">Add new transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Enter description</FormLabel>
              <Input
                placeholder="Enter transaction description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl isInvalid={error}>
              <FormLabel>Enter amount</FormLabel>
              <Input
                placeholder="Enter transaction amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleFormChange}
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            <RadioGroup mt={5} value={formData.type} onChange={handleTypeChange}>
              <Radio value="income" colorScheme="blue">Income</Radio>
              <Radio ml={4} value="expense" colorScheme="red">Expense</Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={4} onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" type="submit">Add</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
