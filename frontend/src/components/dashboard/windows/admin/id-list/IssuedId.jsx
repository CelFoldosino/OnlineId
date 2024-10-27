/** @format */

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useData } from "../../../../context/FetchAccountContext";
import useAuthStore from "../../../../../modules/auth";
import { issuedId } from "../../../../api/issuedId";

const IssuedId = ({ isOpen, approved, onClose }) => {
  const { userId } = useAuthStore();

  const { data, setData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };

  const userLogin = accountLogin();

  const handleIssuedId = async () => {
    setIsLoading(true);
    const body = { userId: approved._id, issuedBy: userLogin._id };
    try {
      const response = await issuedId({
        body,
      });

      const updatedUser = response.data;
      const updatedData = data.map((user) =>
        user._id === updatedUser._id ? { ...user, ...updatedUser } : user
      );
      setData(updatedData);
      toast({
        title: "Success",
        description: " Issued ID",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md" boxShadow="lg">
        <ModalHeader
          textAlign="center"
          fontSize="24px"
          fontWeight="bold"
          color="blue.600"
        >
          Issued ID
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center" fontSize="1.1rem" pb={5} color="gray.700">
            {` Are you sure you want to issued the ID of ${approved.email}`}
          </Text>
          <Flex justify="center" gap={4}>
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "orange.400", color: "white" }}
              onClick={handleIssuedId}
              isLoading={isLoading}
              borderRadius="md"
              boxShadow="sm"
              transition="background-color 0.2s"
            >
              Yes
            </Button>

            <Button
              bg="orange.400"
              color="white"
              _hover={{ bg: "orange.300" }}
              onClick={onClose}
              borderRadius="md"
              boxShadow="sm"
              transition="background-color 0.2s"
            >
              No
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IssuedId;
