/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  WrapItem,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
// import ProfileModal from "./ProfileModal";
import useAuthStore from "../../../modules/auth";
import { useData } from "../../context/FetchAccountContext";
import { FiInfo, FiLock, FiUser } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import ChangePassword from "./ChangePassword";
const Profile = ({ handleTabChange }) => {
  const { data } = useData();
  const { userId, logout } = useAuthStore();

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const userLogin = accountLogin();

  // const handleProfileModal = () => {
  //   setProfile(true);
  // };

  const fullName = useMemo(() => {
    const firstName = userLogin?.firstname || "";
    const middleName = userLogin?.middlename || "";
    const lastName = userLogin?.lastname || "";
    const suffix = userLogin?.suffix || "";

    const name = `${firstName} ${middleName} ${lastName} ${suffix}`.trim();

    return name ? name : userLogin?.email || "No email provided";
  }, [userLogin]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton as={WrapItem} _hover={{ cursor: "pointer" }}>
          <Avatar name={userLogin?.email} src={userLogin?.picture} />
        </MenuButton>
        <MenuList bg="blue.600" mx={5} border="none">
          <Box p={3} color="white">
            <Text fontWeight="semibold">{fullName}</Text>
            <Text fontSize="sm" color="gray.300">
            {userLogin?.role === "admin" && userLogin.roleLevel ===' 1'
              ? "Administrator"
              : userLogin?.role === 'admin' && userLogin.roleLevel === '2'
              ? 'Head'
              : userLogin?.role === 'admin' && userLogin.roleLevel === '3'
              ? 'Sub Staff'
              : userLogin?.role === "student" && userLogin.roleLevel === '4'
              ? "Student"
              : userLogin?.role === "permanent_employee" && userLogin.roleLevel === '4' 
              ? "Permanent Employee"
              :  userLogin?.role === "cos_employee" && userLogin.roleLevel === '4' ? 'COS Employee' : ''}
            </Text>
          </Box>
          <Divider color="white" />
          <MenuItem
            py={3}
            my={1}
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500" }}
            icon={<FiUser />}
            onClick={() => handleTabChange("profile")}
          >
            Profile
          </MenuItem>
          <MenuItem
            py={3}
            my={1}
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500" }}
            icon={<FiInfo />}
            onClick={() => handleTabChange("aboutUs")}
          >
            About Us
          </MenuItem>
          <MenuItem
            py={3}
            my={1}
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500" }}
            icon={<FiLock />}
            onClick={onOpen}
          >
            Change Password
          </MenuItem>
          <Divider color="white" />
          <MenuItem
            py={3}
            my={1}
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500" }}
            icon={<FaSignOutAlt />}
            onClick={() => logout()}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalBody>
            <ChangePassword onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* {profile && <ProfileModal setProfile={setProfile} />} */}

      {/* {allUsers
        .filter(
          (user) =>
            ["admin", "faculty", "staff", "student"].includes(user.role) &&
            user._id === userId
        )
        .map((user) => (
          <Box border="2px solid #CDCACA" w="100%" key={user._id}>
            <Flex gap={2} align="center" py={2} px={3}>
              <Wrap>
                <WrapItem>
                  <Avatar name={user.lastname} src={user.picture}></Avatar>
                </WrapItem>
              </Wrap>
              <Text>{user.lastname || "EMPTY"}</Text>
              <Spacer />
              <Icon
                textAlign="end"
                fontSize="2rem"
                onClick={handleProfileModal}
                _hover={{ cursor: "pointer" }}
              >
                <ArrowUpIcon />
              </Icon>
            </Flex>
          </Box>
        ))} */}

      {/* <div className="w-[50%]">Welcome {auth.user.firstname}</div> */}
    </>
  );
};

export default Profile;
