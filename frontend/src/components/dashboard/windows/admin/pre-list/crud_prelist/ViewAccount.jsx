/** @format */

// ReusableModal.jsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Avatar,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

const ViewAccount = ({ isOpen, onClose, account }) => {
  if (!account) return null;

  const birthdate = account.birthdate;
  const date = birthdate ? new Date(birthdate) : null;
  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  const students = account.role === "student";
  const employee = ["permanent_employee", "cos_employee"].includes(account.role);
  const staff = ["staff"].includes(account.role);
  const faculty = ["faculty"].includes(account.role);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent overflowY="auto" maxH="500">
        <div className="bg-orange-500 p-5 text-white">
          <p className="font-[500] text-[1.3rem]">
            {account.role === "student"
              ? "Student"
              : account.role === "permanent_employee"
              ? "Permanent Employee"
              : "Cos Employee"}{" "}
            Details Overview
          </p>
          <p className="font-[400] opacity-70">PHILSCA PHILIPPINES</p>
        </div>
        <div className=" p-5 border-b-2">
          <p className="font-[500] text-[1.3rem]">Reference ID</p>
          <p className="font-[400] opacity-70">{account._id}</p>
        </div>
        <Flex mx={4} mt={4} mb={8} gap={5}>
          <Tag
            variant="subtle"
            colorScheme="blue"
            size="lg"
            width="fit-content"
          >
            PERSONAL DETAILS
          </Tag>
          <Tag
            variant="subtle"
            colorScheme="blue"
            size="lg"
            width="fit-content"
          >
            PHILSCA PHILIPPINES
          </Tag>
        </Flex>

        {students && (
          <div>
            {" "}
            <div className="mx-4">
              <div className="flex ">
                <p className="w-[35%] text-[.950rem] font-[500]">Student ID</p>
                <p className="w-[65%] text-[.900rem] font-[400] text-uppercase">
                  {account.schoolid || "EMPTY"}
                </p>
              </div>
              <div className="flex mx-">
                <p className="w-[35%] text-[.950rem] font-[500]">Name</p>
                <p className="w-[65%] text-[.900rem] font-[400]">
                  {`${account.firstname ? account.firstname : ""} ${
                    account.middlename ? account.middlename : ""
                  } ${account.lastname ? account.lastname : ""} ${
                    account.suffix ? account.suffix : ""
                  } `}
                </p>
              </div>
              <div className="flex">
                <p className="w-[35%] text-[.950rem] font-[500]">Birthdate</p>
                <p className="w-[65%] text-[.900rem] font-[400]">
                  {formattedDate || "EMPTY"}
                </p>
              </div>

              <div className="flex">
                <p className="w-[35%] text-[.950rem] font-[500]">Course</p>
                <p className="w-[65%] text-[.900rem] font-[400] uppercase">
                  {account.course || "EMPTY"}
                </p>
              </div>
              <div className="flex">
                <p className="w-[35%] text-[.950rem] font-[500]">Schoolyear</p>
                <p className="w-[65%] text-[.900rem] font-[400]">
                  {account.schoolyear || "EMPTY"}
                </p>
              </div>
              <div className="flex">
                <p className="w-[35%] text-[.950rem] font-[500]">
                  ContactNumber
                </p>
                <p className="w-[65%] text-[.900rem] font-[400]">
                  {account.contactnumber || "EMPTY"}
                </p>
              </div>
              <div className="flex">
                <p className="w-[35%] text-[.950rem] font-[500]">
                  ContactPerson
                </p>
                <p className="w-[65%] text-[.900rem] font-[400]">
                  {account.contactperson || "EMPTY"}
                </p>
              </div>
              <div className="flex">
                <p className="w-[35%] text-[.950rem] font-[500]">
                  ContactPerson No.
                </p>
                <p className="w-[65%] text-[.900rem] font-[400]">
                  {account.contactpersonnumber || "EMPTY"}
                </p>
              </div>
              <div className="flex mb-5">
                <p className="w-[35%] text-[.950rem] font-[500] ">Address</p>
                <p className="w-[65%] text-[.900rem] font-[400]">
                  {account.address || "EMPTY"}
                </p>
              </div>
            </div>
          </div>
        )}
        {employee && (
          <div className="mx-4">
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">Staff ID</p>
              <p className="w-[65%] text-[.900rem] font-[400] text-uppercase">
                {account.schoolid || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">Name</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {`${account.firstname} ${account.middlename} ${account.lastname} ${account.suffix} ` ||
                  "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">Birthdate</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {formattedDate || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">Position</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.position || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">Designation</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.designation || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">HGT</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.hgt || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">WGT</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.wgt || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">SSS</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.sss || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">TIN</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.tin || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">
                Contact Number
              </p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.contactnumber || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">
                Contact Person
              </p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.contactperson || "EMPTY"}
              </p>
            </div>
            <div className="flex">
              <p className="w-[35%] text-[.950rem] font-[500]">
                ContactPerson No.
              </p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.contactpersonnumber || "EMPTY"}
              </p>
            </div>
            <div className="flex ">
              <p className="w-[35%] text-[.950rem] font-[500] ">Address</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.address || "EMPTY"}
              </p>
            </div>
          </div>
        )}
        <Flex mx={4} mt={10} mb={8} gap={5}>
          <Tag
            variant="subtle"
            colorScheme="blue"
            size="lg"
            width="fit-content"
          >
            CREDENTIAL DETAILS
          </Tag>
          <Tag
            variant="subtle"
            colorScheme="blue"
            size="lg"
            width="fit-content"
          >
            PHILSCA PHILIPPINES
          </Tag>
        </Flex>
        {students && (
          <div className="mx-4 pb-5">
            <div className="flex ">
              <p className="w-[35%] text-[.950rem] font-[500] ">Email</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.email || "EMPTY"}
              </p>
            </div>
            <div className="flex ">
              <p className="w-[35%] text-[.950rem] font-[500] ">Password</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.password || "EMPTY"}
              </p>
            </div>
          </div>
        )}
        {employee && (
          <div className="mx-4 pb-5">
            <div className="flex ">
              <p className="w-[35%] text-[.950rem] font-[500] ">Email</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.email || "EMPTY"}
              </p>
            </div>
            <div className="flex ">
              <p className="w-[35%] text-[.950rem] font-[500] ">Password</p>
              <p className="w-[65%] text-[.900rem] font-[400]">
                {account.password || "EMPTY"}
              </p>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewAccount;
