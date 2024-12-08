/** @format */

import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";

import React, { useEffect } from "react";
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
  useEffect(() => {
    if (userLogin) {

      console.log(userLogin, 'asda')
    }
  }, [])
  return (
    <Box bg="blue.600" color="white" h="100vh" w="100%">
      <Box>
        <Box p={5}>
          <Text fontSize="1.5rem">PHILSCA</Text>
          <Text>
            {userLogin?.role === "admin" && userLogin.roleLevel ==='1'
              ? "Administrator"
              : userLogin?.role === 'admin' && userLogin.roleLevel === '2'
              ? 'Head'
              : userLogin?.role === 'admin' && userLogin.roleLevel === '3'
              ? 'Sub Staff'
              : userLogin?.role === "student" && userLogin.roleLevel === '4'
              ? "Student"
              : userLogin?.role === "permanent_employee" && userLogin.roleLevel === '4' 
              ? "Permanent Employee"
              :  userLogin?.role === "cos_employee" && userLogin.roleLevel === '4' ? 'COS Employee' : ''}
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
                ["student", "permanent_employee", "cos_employee"].includes(user.role) &&
                user._id === userId
            )
            .map(renderUserLinks)}
        </VStack>
      </Flex>
    </Box>
  );
};
