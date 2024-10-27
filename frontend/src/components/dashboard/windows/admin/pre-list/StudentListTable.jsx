/** @format */

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Box,
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
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Spinner } from "@chakra-ui/react";
import { useData } from "../../../../context/FetchAccountContext";

const StudentListTable = ({
  handleDeleteAccount,
  handleViewAccount,
  handleEditAccount,
}) => {
  const { data, loading } = useData();
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 6;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleViewAccounts = (id) => {
    handleViewAccount(id);
  };

  const handleEditAccounts = (id) => {
    handleEditAccount(id);
  };

  const handleDeleteAccounts = (id) => {
    handleDeleteAccount(id);
    if (
      currentPage >= Math.ceil((filteredStudents.length - 1) / studentsPerPage)
    ) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };
  const filteredStudents = data.filter((account) => account.role === "student");
  const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);

  const displayStudents = filteredStudents
    .reverse()
    .slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box as="section">
          <Box overflow="auto">
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
                        } ${account.lastname || ""} ${
                          account.suffix || ""
                        }`}</Td>
                        <Td>{account.course || ""}</Td>
                        <Td>
                          <Flex gap={2}>
                            <Tooltip label="View" aria-label="View">
                              <IconButton
                                size="sm"
                                colorScheme="blue"
                                aria-label="View"
                                onClick={() => handleViewAccounts(account._id)}
                                icon={<ViewIcon />}
                              />
                            </Tooltip>
                            <Tooltip label="Edit" aria-label="Edit">
                              <IconButton
                                size="sm"
                                colorScheme="orange"
                                aria-label="Edit"
                                onClick={() => handleEditAccounts(account._id)}
                                icon={<EditIcon />}
                              />
                            </Tooltip>
                            <Tooltip label="Delete" aria-label="Delete">
                              <IconButton
                                size="sm"
                                colorScheme="red"
                                aria-label="Delete"
                                onClick={() =>
                                  handleDeleteAccounts(account._id)
                                }
                                icon={<DeleteIcon />}
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
                          <Text
                            fontSize="1.5rem"
                            fontWeight="bold"
                            color="gray.600"
                          >
                            No Students Display
                          </Text>
                        </Flex>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
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
        </Box>
      )}
    </>
  );
};

export default StudentListTable;
