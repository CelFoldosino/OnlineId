/** @format */

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Box,
  VStack,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useData } from "../../context/FetchAccountContext";
import useAuthStore from "../../../modules/auth";
import { updateAccountAPI } from "../../api/AccountsApi";

const ChangePassword = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();

  const { data } = useData();
  const { userId } = useAuthStore();

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const userLogin = accountLogin();

  const closeModal = () => {
    onClose();
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast({
        title: "New Password must not be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!oldPassword) {
      toast({
        title: "Old Password must not be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (oldPassword !== userLogin?.password) {
      toast({
        title: "Make sure old password is correct",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setIsLoading(true);
      const body = {
        password: newPassword,
      };
      const response = await updateAccountAPI({ _id: userLogin?._id, body });
      if (response) {
        const updatedPassword = response.newData.password; // Renamed for clarity
        setNewPassword(updatedPassword);
        toast({
          title: "Successfully Changed Password",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        setNewPassword(""); // Reset the newPassword state
        setOldPassword(""); // Reset the oldPassword state
        onClose(); // Close the modal after successful update
      }
    } catch (error) {
      toast({
        title: "Error",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={6} borderRadius="md" boxShadow="md" width="100%" bg="white">
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" color="blue.800">
          Change Password
        </Heading>
        <form onSubmit={changePassword}>
          <FormControl pb={5}>
            <FormLabel color="blue.700">Old Password:</FormLabel>
            <Input
              type="password" // Change to password for better security
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              borderColor="orange.400" // Use orange for border color
              _hover={{ borderColor: "orange.600" }} // Darker orange on hover
              _focus={{ borderColor: "orange.600", boxShadow: "outline" }} // Focus styles
            />
          </FormControl>
          <FormControl pb={10}>
            <FormLabel color="blue.700">New Password:</FormLabel>
            <Input
              type="password" // Change to password for better security
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              borderColor="orange.400" // Use orange for border color
              _hover={{ borderColor: "orange.600" }} // Darker orange on hover
              _focus={{ borderColor: "orange.600", boxShadow: "outline" }} // Focus styles
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="orange" // Use the orange color scheme for the button
            isLoading={isLoading}
            width="full"
            mb={4} // Full width for the button
          >
            Update
          </Button>
          <Button
            colorScheme="orange" // Use the orange color scheme for the button
            width="full"
            onClick={closeModal}
          >
            Close
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default ChangePassword;
