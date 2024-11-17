/** @format */

import React, { useState, useRef } from "react";
import { Box, useToast } from "@chakra-ui/react";
import logo from "../../../../../assets/philscalogo.png";
import PhilscaLogoCircle from "../../../../../assets/philsca-logo-circle.png";
import ReactToPrint from "react-to-print";
import RegistrarSignature from "../../../../../assets/registrar_signature.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Avatar,
  Image,
  Flex,
} from "@chakra-ui/react";

export default function IdModal({ isOpen, onClose, data, setData, student }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const componentRef = useRef();
  const showPrintButton = data.some((item) => !item.isIdIssued);
  const formatPhoneNumber = (number) => {
    // Pad the number to ensure it's 11 digits
    const paddedNumber = number.padStart(11, "0");
    // Format the number as 0943-348-5534
    return `${paddedNumber.slice(0, 4)}-${paddedNumber.slice(
      4,
      7
    )}-${paddedNumber.slice(7)}`;
  };
  const date = new Date(student.birthdate);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div ref={componentRef} className="flex flex-col items-center">
            {/* Front Card */}
            <Card
              maxW="sm"
              bg="#10145e"
              border="2px"
              borderRadius="lg"
              mb={4}
              w="320px"
            >
              <CardBody p={0}>
                <div>
                  <div className="flex flex-col items-center">
                    {student.role === "student" || student.role === "staff" ? (
                      <>
                        <p className="text-[.9rem] text-white">
                          Republic of the Philippines
                        </p>

                        <p className="text-[.9rem] text-yellow-300">
                          PHILIPPINE STATE COLLEGE OF AERONAUTICS
                        </p>

                        <p className="text-white text-[.9rem] pb-2">
                          Piccio Garden, Villamor. Pasay City
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[.9rem] text-white">
                          Republic of the Philippines
                        </p>
                        <p className="text-[.9rem] text-yellow-300">
                          PHILIPPINE STATE COLLEGE OF AERONAUTICS
                        </p>
                      </>
                    )}
                  </div>

                  {student.role === "student" ? (
                    <>
                      <Stack
                        direction="row"
                        align="center"
                        justify="space-between"
                        bg="#507889"
                        p="1"
                        w="full"
                      >
                        {student.role === "student" ? (
                          <>
                            <Stack align="center">
                              <Image
                                src={logo}
                                alt="Philsca Logo"
                                boxSize="100px"
                              />
                              {student.role === "student" ? (
                                <>
                                  {" "}
                                  <Text fontSize="md" color="yellow.400">
                                    SY-2023-2024
                                  </Text>
                                </>
                              ) : (
                                <></>
                              )}
                            </Stack>
                          </>
                        ) : (
                          <></>
                        )}

                        {student.role === "student" ? (
                          <>
                            <Stack align="center">
                              {student.picture === "" ? (
                                <Avatar
                                  src={student.picture}
                                  alt="profile"
                                  boxSize="100px"
                                />
                              ) : (
                                <Image
                                  src={student.picture}
                                  alt="profile"
                                  boxSize="150px"
                                  mr={4}
                                />
                              )}
                              {student.role === "student" ? (
                                <>
                                  <Text fontSize="sm" color="yellow.400">
                                    1st Sem. / 2nd Sem.
                                  </Text>
                                </>
                              ) : (
                                <></>
                              )}
                            </Stack>
                          </>
                        ) : (
                          <></>
                        )}
                      </Stack>
                    </>
                  ) : (
                    <></>
                  )}
                  {student.role === "staff" ? (
                    <>
                      <Stack
                        direction="row"
                        align="center"
                        justify="space-between"
                        bg="#507889"
                        p="3"
                        w="full"
                      >
                        <>
                          <Stack align="center">
                            <Image
                              src={logo}
                              alt="Philsca Logo"
                              boxSize="100px"
                            />
                          </Stack>
                        </>

                        <>
                          <Stack align="center">
                            {student.picture === "" ? (
                              <Avatar
                                src={student.picture}
                                alt="profile"
                                boxSize="100px"
                              />
                            ) : (
                              <Image
                                src={student.picture}
                                alt="profile"
                                boxSize="150px"
                                mr={4}
                              />
                            )}
                          </Stack>
                        </>
                      </Stack>
                    </>
                  ) : (
                    <></>
                  )}

                  {student.role === "faculty" ? (
                    <>
                      {" "}
                      <div>
                        <div className="flex justfiy-between">
                          <div className="h-[70px] w-[70px]">
                            <img
                              src={logo}
                              alt="Philsca Logo"
                              className="w-full h-full"
                            />
                          </div>
                          <div className="mt-5 text-[.9rem] text-white">
                            <p>Piccio Garden, Villamor. Pasay City</p>
                          </div>
                        </div>
                        <div className="flex justify-between  ml-5 px-3">
                          <div className="h-[100px] ">
                            <img
                              src={PhilscaLogoCircle}
                              alt=""
                              className="h-[100px] w-full"
                            />
                          </div>
                          <div className="h-[130px]justify-end">
                            {student.picture === "" ? (
                              <Avatar
                                src={student.picture}
                                alt="profile"
                                boxSize="100px"
                              />
                            ) : (
                              <img
                                src={student.picture}
                                alt="profile"
                                className="h-[130px] w-[130px]"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center  mt-3">
                          {student.firstname === "" &&
                          student.lastname === "" ? (
                            <p class="text-white">N/A</p>
                          ) : (
                            <Heading
                              size="md"
                              color="white"
                            >{`${student.firstname} ${student.middlename} ${student.lastname}`}</Heading>
                          )}
                          <p class="text-yellow-300 text-[.9rem]">
                            Employee Name
                          </p>
                          {student.schoolid === "" ? (
                            <p class="text-white ">N/A</p>
                          ) : (
                            <Text fontSize="lg" color="white">
                              {student.schoolid}
                            </Text>
                          )}
                          <p class="text-yellow-300 text-[.9rem]">ID Number</p>
                          {student.position === "" ? (
                            <p class="text-white">N/A</p>
                          ) : (
                            <Text fontSize="lg" color="white">
                              {student.position}
                            </Text>
                          )}
                          <p class="text-yellow-300 text-[.9rem]">Positions</p>
                          {student.designation === "" ? (
                            <p class="text-white ">N/A</p>
                          ) : (
                            <Text fontSize="lg" color="white">
                              {student.designation}
                            </Text>
                          )}
                          <p class="text-yellow-300 text-[.9rem]">
                            Designation
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {student.role === "staff" ? (
                    <>
                      <div className="flex flex-col justify-center items-center  bg-white text-black">
                        {!student.firstname || !student.lastname ? (
                          <p>N/A</p>
                        ) : (
                          <p className="uppercase text-[1.1rem] font-bold">{`${student.firstname} ${student.middlename} ${student.lastname}`}</p>
                        )}
                        <p class="text-black text-[.9rem]">EMPLOYEE NAME</p>
                        {student.schoolid === "" ? (
                          <p>N/A</p>
                        ) : (
                          <p className="uppercase text-[1.1rem] font-bold">
                            {student.schoolid}
                          </p>
                        )}
                        <p class="text-black text-[.9rem]">EMPLOYEE NUMBER</p>
                        {student.position === "" ? (
                          <p>N/A</p>
                        ) : (
                          <p className="uppercase text-[1.1rem] font-bold">
                            {student.position}
                          </p>
                        )}
                        <p class="text-black text-[.9rem]">POSITION</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {student.role === "student" ? (
                    <>
                      <Stack
                        align="center"
                        justify="center"
                        bg="white"
                        p="10px"
                        rounded="lg"
                        borderColor="yellow.400"
                        w="80"
                        mb={3}
                      >
                        {student.firstname === "" && student.lastname === "" ? (
                          <Text>N/A</Text>
                        ) : (
                          <Heading
                            size="md"
                            color="black"
                          >{`${student.firstname} ${student.middlename} ${student.lastname}`}</Heading>
                        )}

                        {student.schoolid === "" ? (
                          <Text>N/A</Text>
                        ) : (
                          <Text fontSize="lg" color="black">
                            {student.schoolid}
                          </Text>
                        )}

                        {student.role === "student" ? (
                          <>
                            {student.course === "" ? (
                              <Text>N/A</Text>
                            ) : (
                              <Text fontSize="lg" color="black">
                                {student.course}
                              </Text>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </Stack>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Back Card */}
            <Card maxW="sm" border="2px" borderRadius="lg" w="320px">
              {student.role === "student" ? (
                <>
                  <CardBody px={2}>
                    <div className="flex gap-3 pb-2 items-center">
                      <span className="text-[.9rem] font-[400]">
                        DATE OF BIRTH:{" "}
                      </span>
                      <p className="font-bold">
                        {student.birthdate ? formattedDate : "N/A"}
                      </p>
                    </div>
                    <div className="border-2 border-black">
                      <div className="bg-black text-white">
                        <p className="px-2">IN CASE OF EMERGENCY PLS. NOTIFY</p>
                      </div>
                      <div className="px-2">
                        <div className="flex gap-2">
                          <p className=" font-[400]">Name: </p>
                          <p className=" font-[600]">
                            {student.contactperson || "N/A"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <p className=" font-[400]">Address: </p>
                          <p className=" font-[600]">
                            {student.address || "N/A"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <p className=" font-[400]">Tel. No.: </p>
                          <p className=" font-[600]">
                            {student.contactpersonnumber
                              ? formatPhoneNumber(student.contactpersonnumber)
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="pt-[1.5rem] text-[1.2rem] font-[600] text-center">
                      IMPORTANT
                    </p>
                    <p className="px-2 font-[500] pb-[3.5rem]">
                      THIS CARD IS NON-TRANSFERABLE IT MUST BE WORN WHILE INSIDE
                      THE CAMPUS PREMISES.
                    </p>
                    <div className="flex flex-col">
                      <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[70px]">
                        <div className="absolute top-0 h-[60px]">
                          <img
                            src={student.signature}
                            alt="signature"
                            className="h-full w-full"
                          />
                        </div>
                        <div className="w-full absolute bottom-0">
                          <p className="signature text-[.700rem]">SIGNATURE</p>
                        </div>
                      </div>

                      <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[90px]">
                        <div className="absolute top-0 h-[60px]">
                          <img
                            src={RegistrarSignature}
                            alt="registrar signature"
                            className="h-full w-full"
                          />
                        </div>
                        <div className="w-full absolute bottom-0">
                          <p className="font-bold">MR. DARBY P ESBERANZATE</p>
                          <p className="signature-registrar text-[.700rem] bottom-0">
                            College Registrar
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </>
              ) : (
                <CardBody px={2}>
                  <div class="grid grid-cols-3 border-2 border-black w-full">
                    <div class="border-r-2 border-black text-center">
                      <p className="text-left text-[.9rem] font-bold">HEIGHT</p>
                      <p> {student.hgt ? student.hgt : "N/A"}</p>
                    </div>
                    <div class="border-r-2 border-black text-center">
                      <p className="text-left text-[.9rem] font-bold pl-1">
                        BIRTHDATE
                      </p>
                      <p> {student.birthdate ? formattedDate : "N/A"}</p>
                    </div>
                    <div class="text-center">
                      <p className="text-left text-[.9rem] font-bold pl-1">
                        WEIGHT
                      </p>
                      <p> {student.wgt ? student.wgt : "N/A"}</p>
                    </div>
                  </div>
                  <div className="border-2 border-black">
                    <p className="px-2">IN CASE OF EMERGENCY PLS. NOTIFY</p>

                    <div className="px-2">
                      <div className="flex gap-2">
                        <p className=" font-[400]">Name: </p>
                        <p className=" font-[600]">
                          {student.contactperson || "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <p className=" font-[400]">Address: </p>
                        <p className=" font-[600]">
                          {student.address || "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <p className=" font-[400]">Tel. No.: </p>
                        <p className=" font-[600]">
                          {student.contactpersonnumber
                            ? formatPhoneNumber(student.contactpersonnumber)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[50%] p-1 text-[.9rem] font-[500]">
                      THIS IS TO CERTIFY THAT THE PERSON WHOSE PHOTO AND
                      SIGNATURE APPEAR ON THIS CARD IS AN EMPLOYEE OF THIS
                      COLLEGE.
                    </div>
                    <div className="w-[50%]">
                      <div class="flex flex-col border-2 border-black w-full">
                        <div class=" border-b border-black">
                          <p class="text-left font-bold">GSIS</p>
                          <p className="text-center font-[600]">
                            {student.sss || "N/A"}
                          </p>
                        </div>

                        <div>
                          <p class="text-left font-bold">TIN</p>
                          <p className="text-center font-[600]">
                            {student.tin || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[70px]">
                      <div className="absolute top-0 h-[60px]">
                        <img
                          src={student.signature}
                          alt="signature"
                          className="h-full w-full"
                        />
                      </div>
                      <div className="w-full absolute bottom-0">
                        <p className="signature text-[.700rem]">SIGNATURE</p>
                      </div>
                    </div>

                    <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[90px]">
                      <div className="absolute top-0 h-[60px]">
                        <img
                          src={RegistrarSignature}
                          alt="registrar signature"
                          className="h-full w-full"
                        />
                      </div>
                      <div className="w-full absolute bottom-0">
                        <p className="font-bold">DR. MARWIN M. DELACRUZ</p>
                        <p className="signature-registrar text-[.6rem] bottom-0">
                          COLLEGE PRESIDENT
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              )}
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
            {showPrintButton && !student.isIdIssued && (
              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    isLoading={isLoading}
                  >
                    Print ID
                  </Button>
                )}
                content={() => componentRef.current}
              />
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}