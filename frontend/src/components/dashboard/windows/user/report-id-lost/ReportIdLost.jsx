/** @format */

import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Upload } from "../../../../Upload";

const StudentRegistration = () => {
  return (
    <Container maxW="container.xl" p={5}>
      <Box px={3} py={5}>
        <Text pb={10} fontWeight="bold" fontSize="18px">
          Fill your reports
        </Text>

        <Box>
          <Upload />
        </Box>
      </Box>
    </Container>
  );
};

export default StudentRegistration;
