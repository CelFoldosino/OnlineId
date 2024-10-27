/** @format */

import { ChevronLeftIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { useData } from "../../../../context/FetchAccountContext";

const StudentIdLost = ({
  filterCriteria,
  searchQuery,
  selectedProgram,
  handleViewAccount,
  currentPage,
  handlePageClick,
}) => {
  const { data, setData } = useData();
  const studentsPerPage = 6;

  // Filter students based on role
  const filteredStudentsWithAffidavit = data.filter(
    (account) => account.role === "student" && account.affidavit
  );

  // Apply search and filter criteria
  const filteredStudents = filteredStudentsWithAffidavit
    .reverse()
    .filter((student) => {
      const fullName = `${student.firstname} ${student.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((student) => {
      if (selectedProgram === "") return true;
      return selectedProgram === student.course ? student.course : "";
    });

  // Pagination logic
  const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);
  const displayStudents = filteredStudents.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

  return (
    <>
      <TableContainer
        borderRadius="lg"
        boxShadow="md"
        overflow="hidden"
        variant="simple"
      >
        <Table size="sm">
          <Thead bg="blue.700">
            <Tr>
              <Th color="white" fontWeight="bold">
                Student ID
              </Th>
              <Th color="white" fontWeight="bold">
                Name
              </Th>
              <Th color="white" fontWeight="bold">
                Course
              </Th>
              <Th color="white" fontWeight="bold">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayStudents.length > 0 ? (
              displayStudents.map((account) => (
                <Tr
                  key={account._id}
                  _hover={{ bg: "orange.400", color: "white" }}
                  transition="background-color 0.2s"
                >
                  <Td>{account.schoolid}</Td>
                  <Td>{`${account.firstname || ""} ${
                    account.middlename || ""
                  } ${account.lastname || ""} ${account.suffix || ""}`}</Td>
                  <Td>{account.course || ""}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Tooltip label="View" aria-label="View">
                        <IconButton
                          size="sm"
                          colorScheme="blue"
                          icon={<ViewIcon />}
                          onClick={() => handleViewAccount(account)}
                          View
                        />
                      </Tooltip>
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4}>
                  <Flex justify="center" align="center" minHeight="150px">
                    <Text fontSize="1.5rem" fontWeight="bold" color="gray.600">
                      No Students ID Lost Display
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
        <Box h="10vh" pt={10}>
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
    </>
  );
};

export default StudentIdLost;
