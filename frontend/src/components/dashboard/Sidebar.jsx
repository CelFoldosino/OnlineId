/** @format */

import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";

import React from "react";
import { useAuth } from "../context/Auth";
import { useData } from "../context/FetchAccountContext";
import useAuthStore from "../../modules/auth";

export const SideBar = ({ isOpen, renderLinks, renderUserLinks }) => {
  const { data } = useData();
  const { userId } = useAuthStore();
  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const userLogin = accountLogin();
  return (
    <Box bg="blue.600" color="white" h="100vh" w="100%">
      <Box>
        <Box p={5}>
          <Text fontSize="1.5rem">PHILSCA</Text>
          <Text>
            {userLogin?.role === "admin"
              ? "Administrator"
              : userLogin?.role === "student"
              ? "Student"
              : userLogin?.role === "faculty" || userLogin?.role === "staff"
              ? "Employee"
              : ""}
          </Text>
        </Box>
        <Divider borderColor="whiteAlpha.300" />
      </Box>
      <Flex flexDir="column" justify="space-between" h="100%" py={2} px={3}>
        <VStack display={{ base: "none", md: "none", lg: "block" }}>
          {data.map(renderLinks)}
          {data
            .filter(
              (user) =>
                ["student", "faculty", "staff"].includes(user.role) &&
                user._id === userId
            )
            .map(renderUserLinks)}
        </VStack>
      </Flex>
    </Box>
  );
};
