/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Select,
  Button,
  TableContainer,
  useBreakpointValue,
  Container,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import ReactToPrint from "react-to-print";
import { getIssuedId } from "../../../../api/issuedId";
import { useData } from "../../../../context/FetchAccountContext";

const Reports = () => {
  const [issuedID, setIssuedID] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOption, setFilterOption] = useState("today");
  const [isLoading, setIsLoading] = useState(false);

  const { data: users } = useData(); // Assuming useData fetches users including roles
  const tableRef = useRef(); // Reference for the table

  const roleMap = {
    1: "Admin",
    2: "Head",
    3: "Sub-Staff",
    // Add more role mappings as needed
  };

  const fetchIssuedId = async () => {
    setIsLoading(true);
    try {
      const response = await getIssuedId();
      setIssuedID(response.data);
      applyFilter(response.data, filterOption); // Apply initial filter
    } catch (error) {
      console.error("Failed to fetch issued IDs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedId();
  }, []);

  const applyFilter = (data, filter) => {
    const today = new Date();
    let filtered = [];

    if (filter === "today") {
      filtered = data.filter(
        (entry) =>
          new Date(entry.issuedDate).toDateString() === today.toDateString()
      );
    } else if (filter === "last7days") {
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);
      filtered = data.filter(
        (entry) => new Date(entry.issuedDate) >= last7Days
      );
    } else if (filter === "thisMonth") {
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      filtered = data.filter(
        (entry) => new Date(entry.issuedDate) >= thisMonthStart
      );
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    applyFilter(issuedID, e.target.value); // Apply filter based on selection
  };

  // Helper function to get the roleName by issuedBy
  const getRoleName = (issuedById) => {
    const user = users.find((user) => user._id === issuedById); // Find user by issuedBy ID
    if (user) {
      return roleMap[user.roleLevel] || "Unknown"; // Map roleLevel to roleName
    }
    return "Unknown"; // Default if user or roleLevel is not found
  };

  const getName = (issuedById) => {
    const user = users.find((user) => user._id === issuedById); // Find user by issuedBy ID
    if (user) {
      return `${user.firstname} ${user.lastname}`; // Return full name
    }
  };

  const tableSize = useBreakpointValue({ base: "sm", md: "md" }); // Responsively set table size

  // Function to format the current date
  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Container maxW="container.xl" p={4}>
          <Box
            p={5}
            border="1px solid #ccc"
            borderRadius="md"
            bg="white"
            overflowX="auto" // Ensures the table is scrollable horizontally
          >
            {/* Filter Dropdown (Hidden during printing using CSS) */}
            <Select
              value={filterOption}
              onChange={handleFilterChange}
              mb={4}
              w="200px"
            >
              <option value="today">Today</option>
              <option value="last7days">Last 7 Days</option>
              <option value="thisMonth">This Month</option>
            </Select>

            {/* Table */}
            <Box ref={tableRef} mt={4}>
              <Text
                fontSize="2xl"
                mb={4}
                fontWeight="bold"
                textAlign="center"
                color="blue.700"
              >
                Monthly ID Issuance Report
              </Text>
              {/* Current Date Display */}
              <Text fontSize="lg" mb={4} textAlign="left" color="gray.700">
                Date: {getCurrentDate()}
              </Text>
              <TableContainer borderRadius="lg" boxShadow="md" variant="simple">
                {filteredData.length > 0 ? (
                  <Table size={tableSize}>
                    <Thead bg="blue.700">
                      <Tr>
                        <Th color="white">Date Issued</Th>
                        <Th color="white">Total Issued IDs</Th>
                        <Th color="white">Role</Th>
                        <Th color="white">Name</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredData.map((entry, index) => (
                        <Tr key={index} bg="blue.100">
                          <Td>{entry.issuedDate}</Td>
                          <Td>{entry.totalIssued}</Td>
                          <Td>{getRoleName(entry.issuedBy)}</Td>
                          <Td>{getName(entry.issuedBy)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Text color="gray.500" fontSize="lg" mt={4}>
                    No IDs issued during this period.
                  </Text>
                )}
              </TableContainer>
            </Box>

            {/* ReactToPrint Button */}
            <Box mt={5} textAlign="center">
              <ReactToPrint
                trigger={() => (
                  <Button colorScheme="orange" mt={4}>
                    Print Report
                  </Button>
                )}
                content={() => tableRef.current} // Reference to the table for printing
              />
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Reports;
