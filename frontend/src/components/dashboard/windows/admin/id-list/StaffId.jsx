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

const StaffId = ({
  handleApprovedOpen,
  filterCriteria,
  searchQuery,
  handleViewClick,
  currentPage,
  handleOpenMail,
  handlePageClick,
}) => {
  const { data } = useData();
  const staffPerPage = 6;

  const filteredStaffId = data.filter((account) => account.role === "staff");
  const pageCount = Math.ceil(filteredStaffId.length / staffPerPage);

  const filteredStaff = filteredStaffId
    .reverse()
    .filter((staff) => {
      const fullName = `${staff.firstname} ${staff.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((staff) => {
      if (filterCriteria === "") return true;
      return filterCriteria === "issued" ? staff.isIdIssued : !staff.isIdIssued;
    });

  const displayStaff = filteredStaff.slice(
    currentPage * staffPerPage,
    (currentPage + 1) * staffPerPage
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
                Staff ID
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
            {displayStaff.length > 0 ? (
              displayStaff.map((account) => (
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
                      No Staffs Display
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

export default StaffId;
