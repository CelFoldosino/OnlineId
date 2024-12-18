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
  Button,
  TableContainer,
  useBreakpointValue,
  Container,
  Flex,
  Spinner,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import ReactToPrint from "react-to-print";
import { getIssuedId } from "../../../../api/issuedId";
import { useData } from "../../../../context/FetchAccountContext";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Reports = () => {
  const [issuedID, setIssuedID] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
  

  const { data: users } = useData(); // Assuming useData fetches users including roles
  const tableRef = useRef(); // Reference for the table

  const reportsPerPage = 14;

  const pageCount = Math.ceil(filteredData.length / reportsPerPage);

  const displayReports = filteredData.slice(
    currentPage * reportsPerPage,
    (currentPage + 1) * reportsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const roleMap = {
    1: "Admin",
    2: "Head",
    3: "Sub-Staff",
  };

  


  const fetchIssuedId = async () => {
    setIsLoading(true);
    try {
      const response = await getIssuedId();
      setIssuedID(response.data);
      applyFilter(response.data, fromDate, toDate); 
     
    } catch (error) {
      console.error("Failed to fetch issued IDs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedId();
  }, []);

  useEffect(() => {
    if (issuedID.length > 0 && !fromDate && !toDate) {
      const sortedData = [...issuedID].sort((a, b) => new Date(a.issuedDate) - new Date(b.issuedDate));
      const newFromDate = sortedData[0].issuedDate; // Earliest date in the data
      const newToDate = sortedData[sortedData.length - 1].issuedDate; // Latest date in the data
      setFromDate(newFromDate);
      setToDate(newToDate);
      applyFilter(issuedID, newFromDate, newToDate); // Filter data based on the new date range
    }
  }, [issuedID]);

  const applyFilter = (data, fromDate, toDate) => {
    let filtered = data;

    if (fromDate) {
      filtered = filtered.filter((entry) => new Date(entry.issuedDate) >= new Date(fromDate));
    }
    if (toDate) {
      filtered = filtered.filter((entry) => new Date(entry.issuedDate) <= new Date(toDate));
    }

    setFilteredData(filtered);
  };

  const handleDateChange = () => {
    applyFilter(issuedID, fromDate, toDate); // Apply filter when dates change
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
  const today = new Date().toISOString().split("T")[0];

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
            {/* Date Range Picker */}
            <Flex mb={4}>
              <FormControl mr={4} w="200px">
                <FormLabel htmlFor="fromDate">From</FormLabel>
                <Input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => {
                    const newFromDate = e.target.value;
                    if (newFromDate <= toDate || !toDate) {
                      setFromDate(newFromDate);
                    }
                  }}
                  max={toDate || today} // Prevent "From" date from being later than "To" date
                />
              </FormControl>
              <FormControl w="200px">
                <FormLabel htmlFor="toDate">To</FormLabel>
                <Input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => {
                    const newToDate = e.target.value;
                    if (newToDate >= fromDate || !fromDate) {
                      setToDate(newToDate);
                    }
                  }}
                  max={today} // Prevent "To" date from being in the future
                />
              </FormControl>
              <Button
                colorScheme="blue"
                ml={4}
                mt={6}
               
                onClick={handleDateChange}
                disabled={!fromDate || !toDate}
              >
                Filter
              </Button>
            </Flex>

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
    Date Range:{" "}
    {fromDate ? new Date(fromDate).toLocaleDateString() : "From Not Selected"} -{" "}
    {toDate ? new Date(toDate).toLocaleDateString() : "To Not Selected"}
  </Text>
              <TableContainer borderRadius="lg" boxShadow="md" variant="simple">
                {displayReports.length > 0 ? (
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
                      {displayReports.map((entry, index) => (
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

            {pageCount > 1 && (
        <Box pt="1rem">
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={<ChevronLeftIcon />}
            nextLabel={<ChevronRightIcon />}
          />
        </Box>
      )}

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
