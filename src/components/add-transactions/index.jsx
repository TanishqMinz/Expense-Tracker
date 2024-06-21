import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, RadioGroup, Radio, Button, FormErrorMessage } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context";

export default function TransactionForm({ onClose, isOpen }) {

    const { formData, setFormData, value, setValue, handleFormSubmit } = useContext(GlobalContext);
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

    function handleSubmit(event) {
        event.preventDefault();
        if (formData.amount < 0) {
            setError('Amount cannot be negative');
            return;
        }
        handleFormSubmit(formData);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter description</FormLabel>
                            <Input placeholder="Enter transaction description" name="description" type="text" onChange={handleFormChange} />
                        </FormControl>
                        <FormControl isInvalid={error}>
                            <FormLabel>Enter amount</FormLabel>
                            <Input placeholder="Enter transaction amount" name="amount" type="number" onChange={handleFormChange} />
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                        <RadioGroup mt={'5'} value={value} onChange={setValue}>
                            <Radio checked={formData.type === 'income'} value='income' colorScheme='blue' name='type' onChange={handleFormChange}>Income</Radio>
                            <Radio ml={'2'} checked={formData.type === 'expense'} value='expense' colorScheme='red' name='type' onChange={handleFormChange}>Expense</Radio>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={'4'} onClick={onClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}
