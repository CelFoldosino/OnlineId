/** @format */

import React from "react";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import Profile from "./windows/Profile";

const Navbar = ({ onOpen, islargerthanlg, handleTabChange }) => {
  return (
    <Box h={70} boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)">
      <Flex align="center" h="100%">
        {/* DRAWER BUTTON */}
        <Box
          cursor="pointer"
          display={islargerthanlg ? "none" : "flex"} // Show only on small screens
          onClick={onOpen}
        >
          <Icon as={FiMenu} boxSize={6} color="black" ml={5} />
        </Box>

        <Box ml="auto" mr={4}>
          <Profile handleTabChange={handleTabChange} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
