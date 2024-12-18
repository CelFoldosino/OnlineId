/** @format */

// ReusableModal.jsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Avatar,
  Image,
  Link,
  Tag,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const ModalAffidavit = ({ isOpen, handleCloseModal, account }) => {
  if (!account) return null;

  return (
    <Modal isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent overflowY="auto" maxH="500">
        <div className="bg-orange-500 p-5 text-white flex justify-between items-center">
          <div>
            <p className="font-[500] text-[1.3rem]">{"ID Lost Overview"}</p>
            <p className="font-[400] opacity-70">PHILSCA PHILIPPINES</p>
          </div>
          <div>
            <IconButton
              aria-label="Close"
              icon={<CloseIcon />}
              onClick={() => handleCloseModal()}
            />
          </div>
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
            ID LOST DETAILS
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
        <div className="mx-4">
          <div className="flex">
            <p className="w-[35%] text-[.950rem] font-[500]">Name</p>
            <p className="w-[65%] text-[.900rem] font-[400] text-uppercase">
              {`${account.firstname} ${account.middlename} ${account.lastname} ${account.suffix} ` ||
                "EMPTY"}
            </p>
          </div>
          <div className="flex">
            <p className="w-[35%] text-[.950rem] font-[500]">Message</p>
            <p className="w-[65%] text-[.900rem] font-[400]">
              {account.message || "EMPTY"}
            </p>
          </div>
        </div>
        <Flex mx={4} mt={4} mb={8} gap={5}>
          <Tag
            variant="subtle"
            colorScheme="blue"
            size="lg"
            width="fit-content"
          >
            AFFIDAVIT IMAGE
          </Tag>
          
        </Flex>
        <div className="w-full px-10">
          <Link
            href={account.affidavit}
            download={true}
            isExternal
            rel="noopener noreferrer"
          >
            <Image
              w="100%"
              src={account.affidavit}
              alt="Affidavit"
              borderRadius={10}
              maxW="100%"
              objectFit="contain"
            />
          </Link>
        </div>

        <Flex mx={4} mt={10} mb={8} gap={5}>
          <Tag
            variant="subtle"
            colorScheme="blue"
            size="lg"
            width="fit-content"
          >
            RECEIPT IMAGE
          </Tag>
          
        </Flex>
        <div className="w-full px-10">
          <Link
            href={account.receipt}
            download={true}
            isExternal
            rel="noopener noreferrer"
          >
            <Image
              w="100%"
              src={account.receipt}
              alt="Affidavit"
              borderRadius={10}
              maxW="100%"
              objectFit="contain"
            />
          </Link>
        </div>
        ;
      </ModalContent>
    </Modal>
  );
};

export default ModalAffidavit;
