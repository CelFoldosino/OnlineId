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
import { Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useData } from "../../../../context/FetchAccountContext";

const InstructorListTable = ({
  handleDeleteAccount,
  handleViewAccount,
  handleEditAccount,
}) => {
  const { data, loading, setData } = useData();
  const [currentPage, setCurrentPage] = useState(0);
  const facultyPerPage = 4;

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
      currentPage >= Math.ceil((filteredFaculty.length - 1) / facultyPerPage)
    ) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  const filteredFaculty = data.filter((account) => account.role === "faculty");
  const pageCount = Math.ceil(filteredFaculty.length / facultyPerPage);

  const displayFaculty = filteredFaculty
    .reverse()
    .slice(currentPage * facultyPerPage, (currentPage + 1) * facultyPerPage);

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box as="section">
          <Box h="60vh" overflow="auto">
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
                      Faculty ID
                    </Th>
                    <Th color="white" fontWeight="bold">
                      Name
                    </Th>
                    <Th color="white" fontWeight="bold">
                      Position
                    </Th>
                    <Th color="white" fontWeight="bold">
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayFaculty.length > 0 ? (
                    displayFaculty.map((account) => (
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
                        <Td>{account.position || ""}</Td>
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
                            No Faculty Display
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
            <Box h="10vh" pt={20}>
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

export default InstructorListTable;
