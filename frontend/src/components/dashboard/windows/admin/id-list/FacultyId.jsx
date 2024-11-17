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
  Text,
  Th,
  Thead,
  Tr,
  Flex,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { useData } from "../../../../context/FetchAccountContext";

const FacultyId = ({
  filterCriteria,
  searchQuery,
  handleViewClick,
  handleApprovedOpen,
  handleOpenMail,
  currentPage,
  handlePageClick,
}) => {
  const { data, setData } = useData();

  const facultyPerPage = 6;

  const filteredFacultyId = data.filter(
    (account) => account.role === "faculty"
  );
  const pageCount = Math.ceil(filteredFacultyId.length / facultyPerPage);

  const filteredFacuty = filteredFacultyId
    .reverse()
    .filter((faculty) => {
      const fullName = `${faculty.firstname} ${faculty.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((faculty) => {
      if (filterCriteria === "") return true;
      return filterCriteria === "issued"
        ? faculty.isIdIssued
        : !faculty.isIdIssued;
    });

  const displayFaculty = filteredFacuty.slice(
    currentPage * facultyPerPage,
    (currentPage + 1) * facultyPerPage
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
                Permanent ID
              </Th>
              <Th color="white" fontWeight="bold">
                Name
              </Th>
              <Th color="white" fontWeight="bold">
                Positon
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
                  } ${account.lastname || ""} ${account.suffix || ""}`}</Td>
                  <Td>{account.position || ""}</Td>
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
                      No Permanent Employee Display
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

export default FacultyId;
