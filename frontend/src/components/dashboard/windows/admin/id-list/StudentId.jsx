/** @format */

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EmailIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Tooltip,
  Text,
  IconButton,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { useData } from "../../../../context/FetchAccountContext";

const StudentId = ({
  filterCriteria,
  searchQuery,
  selectedProgram,
  handleViewClick,
  handleApprovedOpen,
  handleOpenMail,
  currentPage,
  handlePageClick,
}) => {
  const { data, setData } = useData();
  const studentsPerPage = 6;

  // Filter students based on role
  const filteredStudentsId = data.filter(
    (account) => account.role === "student"
  );

  // Apply search and filter criteria
  const filteredStudents = filteredStudentsId
    .reverse()
    .filter((student) => {
      const fullName = `${student.firstname} ${student.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((student) => {
      if (filterCriteria === "") return true;
      return filterCriteria === "issued"
        ? student.isIdIssued
        : !student.isIdIssued;
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
                          onClick={() => handleViewClick(account)}
                          View
                        />
                      </Tooltip>
                      {!account.isIdIssued && (
                        <Tooltip label="Issued ID" aria-label="issued-id">
                          <IconButton
                            size="sm"
                            icon={<CheckIcon />}
                            colorScheme="orange"
                            onClick={() => handleApprovedOpen(account)}
                            aria-label="issued-id"
                          >
                            Issued ID
                          </IconButton>
                        </Tooltip>
                      )}

                      {account.isIdIssued && (
                        <Tooltip label="Email" aria-label="email">
                          <IconButton
                            size="sm"
                            colorScheme="orange"
                            icon={<EmailIcon />}
                            onClick={() => handleOpenMail(account)}
                            aria-label="email" // Add an aria-label for accessibility
                          >
                            Email
                          </IconButton>
                        </Tooltip>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4}>
                  <Flex justify="center" align="center" minHeight="150px">
                    <Text fontSize="1.5rem" fontWeight="bold" color="gray.600">
                      No Students Display
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

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
    </>
  );
};

export default StudentId;
