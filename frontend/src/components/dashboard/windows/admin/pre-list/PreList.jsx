/** @format */

import {
  Box,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Flex,
  useDisclosure,
  Spacer,
  Tooltip,
  IconButton,
  Container,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import StudentListTable from "./StudentListTable";
import { DeleteAccountModal } from "./crud_prelist/DeleteAccount";
import ViewAccount from "./crud_prelist/ViewAccount";
import EditAccount from "./crud_prelist/EditAccount";
import InstructorListTable from "./InstructorListTable";
import StaffListTable from "./StaffListTable";
import { AddIcon, AttachmentIcon } from "@chakra-ui/icons";
import GenerateAccount from "./crud_prelist/GenerateAccount";
import { useData } from "../../../../context/FetchAccountContext";
import UploadAccount from "./crud_prelist/UploadAccount";
import useAuthStore from "../../../../../modules/auth";

const PreList = () => {
  // const [accounts, setAccounts] = useState([]);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const [viewAccount, setViewAccount] = useState(null);
  const [editAccount, setEditAccount] = useState(null);
  const [generateAccount, setGenerateAccount] = useState(null);
  const { data } = useData();
  const { userId } = useAuthStore();

  // const [loading, setLoading] = useState(true);
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isGenerateOpen,
    onOpen: onGenerateOpen,
    onClose: onGenerateClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
  } = useDisclosure(); // For the upload modal

  const handleViewAccount = (accountId) => {
    const account = data.find((acc) => acc._id === accountId);
    setViewAccount(account);
    onViewOpen();
  };

  const handleEditAccount = (accountId) => {
    const account = data.find((acc) => acc._id === accountId);
    setEditAccount(account);
    onEditOpen();
  };

  const handleDeleteAccount = (accountId) => {
    const account = data.find((acc) => acc._id === accountId);
    if (account) {
      setDeleteAccount({ ...account }); // Make sure to include all fields from account
      onDeleteOpen();
    }
  };

  const handleGenerateModalOpen = () => {
    setGenerateAccount(true);
    onGenerateOpen();
  };

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const userLogin = accountLogin();

  return (
    <>
      <Container maxW="container.xl" p={4}>
        <Tabs>
          <TabList py={10} px={5} bg="blue.600" shadow="md">
            <Tab _selected={{ borderColor: "white" }} color="white">
              STUDENTS
            </Tab>
            <Tab color="white">FACULTIES</Tab>
            <Tab color="white">STAFFS</Tab>
            <Spacer />
            {userLogin.roleLevel !== "3" ? (
              <Flex gap={2}>
                <Tooltip label="Upload" aria-label="Upload tooltip">
                  <IconButton
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    icon={<AttachmentIcon />} // Use only the icon
                    onClick={onUploadOpen} // Open the upload modal
                    aria-label="Upload"
                  />
                </Tooltip>

                <Tooltip
                  label="Generate Account"
                  aria-label="Generate Account tooltip"
                >
                  <IconButton
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    icon={<AddIcon />} // Use only the icon
                    onClick={handleGenerateModalOpen} // Open modal for generating account
                    aria-label="Generate Account"
                  />
                </Tooltip>
              </Flex>
            ) : (
              <></>
            )}
          </TabList>

          <TabPanels>
            <TabPanel>
              <List>
                <ListItem>
                  <StudentListTable
                    handleDeleteAccount={handleDeleteAccount}
                    handleViewAccount={handleViewAccount}
                    handleEditAccount={handleEditAccount}
                  />
                </ListItem>
              </List>
            </TabPanel>

            <TabPanel>
              <List>
                <ListItem>
                  <InstructorListTable
                    handleDeleteAccount={handleDeleteAccount}
                    handleViewAccount={handleViewAccount}
                    handleEditAccount={handleEditAccount}
                  />
                </ListItem>
              </List>
            </TabPanel>

            <TabPanel>
              <List>
                <ListItem>
                  <StaffListTable
                    handleDeleteAccount={handleDeleteAccount}
                    handleViewAccount={handleViewAccount}
                    handleEditAccount={handleEditAccount}
                  />
                </ListItem>
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      <UploadAccount isOpen={isUploadOpen} onClose={onUploadClose} />

      {deleteAccount && (
        <DeleteAccountModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          deleteAccount={deleteAccount}
          setDeleteAccount={setDeleteAccount}
        />
      )}

      {viewAccount && (
        <ViewAccount
          isOpen={isViewOpen}
          onClose={onViewClose}
          account={viewAccount}
        />
      )}

      {editAccount && (
        <EditAccount
          isOpen={isEditOpen}
          onClose={onEditClose}
          account={editAccount}
        />
      )}
      {generateAccount && (
        <GenerateAccount
          isOpen={isGenerateOpen}
          onClose={onGenerateClose}
          accounts={data}
        />
      )}
    </>
  );
};

export default PreList;
