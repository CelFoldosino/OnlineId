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
              w="520px"
              h="558px"
            >
              <CardBody p={0}>
                <div>
                  <div className="flex flex-col items-center">
                    {student.role === "student" ||
                    student.role === "cos_employee" ? (
                      <>
                        <p className="text-[1.3rem] text-white">
                          Republic of the Philippines
                        </p>
                        {student.role === "student" ? (
                          <>
                            <p className=" id-header  text-[1.5rem]">
                              PHILIPPINE STATE COLLEGE{" "}
                              <span className="block">OF AERONAUTICS</span>
                            </p>
                          </>
                        ) : student.role === "cos_employee" ? (
                          <>
                            <p className=" id-header  text-[1rem]">
                              PHILIPPINE STATE COLLEGE OF AERONAUTICS
                            </p>
                          </>
                        ) : (
                          <> </>
                        )}

                        <p className="text-white text-[1.2rem] pb-2">
                          Piccio Garden, Villamor. Pasay City
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[1.3rem]  text-white">
                          Republic of the Philippines
                        </p>
                        <p className=" text-[1rem]] id-header">
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
                                boxSize="200px"
                              />
                              {student.role === "student" ? (
                                <>
                                  <p className="text-yellow-300 text-[1.3rem]">
                                    SY-2023-2024
                                  </p>
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
                            <Stack align="center" justify="center">
                              {student.picture === "" ? (
                                <Avatar
                                  src={student.picture}
                                  alt="profile"
                                  boxSize="200px"
                                />
                              ) : (
                                <Image
                                  src={student.picture}
                                  alt="profile"
                                  boxSize="200px"
                                />
                              )}
                              {student.role === "student" ? (
                                <>
                                  <p className="text-yellow-300 text-[1.3rem]">
                                    1st Sem./2nd Sem.
                                  </p>
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
                  {student.role === "cos_employee" ? (
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
                              boxSize="200px"
                            />
                          </Stack>
                        </>

                        <>
                          <Stack align="center">
                            {student.picture === "" ? (
                              <Avatar
                                src={student.picture}
                                alt="profile"
                                boxSize="200px"
                              />
                            ) : (
                              <Image
                                src={student.picture}
                                alt="profile"
                                boxSize="200px"
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

                  {student.role === "permanent_employee" ? (
                    <>
                      {" "}
                      <div>
                        <div className="flex justfiy-between px-2">
                          <div className="h-[80px] w-[60px]">
                            <img
                              src={logo}
                              alt="Philsca Logo"
                              className="w-full h-full"
                            />
                          </div>
                          <div className="mt-5 text-[1.2rem] text-white">
                            <p>Piccio Garden, Villamor. Pasay City</p>
                          </div>
                        </div>
                        <div className="flex justify-between gap-2 px-3">
                          <div>
                            <Avatar
                              src={PhilscaLogoCircle}
                              alt=""
                              boxSize="150px"
                            />
                          </div>
                          <div>
                            {student.picture === "" ? (
                              <Avatar
                                src={student.picture}
                                alt="profile"
                                boxSize="200px"
                              />
                            ) : (
                              <Image
                                src={student.picture}
                                alt="profile"
                                boxSize="200px"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center text-white pt-1">
                          {student.firstname === "" &&
                          student.lastname === "" ? (
                            <p class="text-white text-[1.2rem]">N/A</p>
                          ) : (
                            <h3 className="text-[1.2rem]">{`${student.firstname} ${student.middlename} ${student.lastname}`}</h3>
                          )}
                          <p class="text-yellow-300 text-[1rem]">
                            Employee Name
                          </p>
                          {student.schoolid === "" ? (
                            <p class="text-white text-[1.2rem]">N/A</p>
                          ) : (
                            <p className="text-[1.2rem]">{student.schoolid}</p>
                          )}
                          <p class="text-yellow-300 text-[1rem]">ID Number</p>
                          {student.position === "" ? (
                            <p class="text-white text-[1.2rem]">N/A</p>
                          ) : (
                            <p className=" text-[1.2rem]">{student.position}</p>
                          )}
                          <p class="text-yellow-300 text-[1rem]">Positions</p>
                          {student.designation === "" ? (
                            <p class="text-white text-[1.2rem]">N/A</p>
                          ) : (
                            <p className="text-[1.2rem]">
                              {student.designation}
                            </p>
                          )}
                          <p class="text-yellow-300 text-[1rem]">Designation</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {student.role === "cos_employee" ? (
                    <>
                      <div className="flex flex-col justify-center items-center custom-bg text-black h-[238px] ">
                        <div className="text-content">
                          {!student.firstname || !student.lastname ? (
                            <p className="text-[1.2rem] font-bold">N/A</p>
                          ) : (
                            <p className="uppercase text-[1.2rem] font-bold">
                              {`${student.firstname} ${student.middlename} ${student.lastname}`}
                            </p>
                          )}
                          <p className="text-black text-[1rem] font-[450]">
                            EMPLOYEE NAME
                          </p>
                          {student.schoolid === "" ? (
                            <p className="text-[1.2rem] font-bold">N/A</p>
                          ) : (
                            <p className="uppercase text-[1.2rem] font-bold">
                              {student.schoolid}
                            </p>
                          )}
                          <p className="text-black text-[1rem] font-[450]">
                            EMPLOYEE NUMBER
                          </p>
                          {student.position === "" ? (
                            <p className="text-[1.2rem] font-bold">N/A</p>
                          ) : (
                            <p className="uppercase text-[1.2rem] font-bold">
                              {student.position}
                            </p>
                          )}
                          <p className="text-black text-[1rem] font-[450]">
                            POSITION
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {student.role === "student" ? (
                    <>
                      <div className="border border-orange-500 flex flex-col items-center justify-center m-2 bg-white font-bold ">
                        {student.firstname === "" && student.lastname === "" ? (
                          <p className="name text-center text-[1.5rem]">N/A</p>
                        ) : (
                          <h3 className="name text-center text-[1.5rem]">{`${student.firstname} ${student.middlename} ${student.lastname}`}</h3>
                        )}

                        {student.schoolid === "" ? (
                          <p className="school-id text-[1.5rem]">N/A</p>
                        ) : (
                          <p className="school-id text-[1.5rem]">
                            {student.schoolid}
                          </p>
                        )}

                        {student.course === "" ? (
                          <p className="program text-[1.5rem]">N/A</p>
                        ) : (
                          <p className="program text-[1.5rem]">
                            {student.course}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Back Card */}
            <Card maxW="sm" border="2px" borderRadius="lg" w="520px" h="558px">
              {student.role === "student" ? (
                <>
                  <CardBody px={2}>
                    <div
                      className="flex gap-2 pb-2 items-center  font-bold"
                      id="birthDate"
                    >
                      <span className=" ">DATE OF BIRTH: </span>
                      <p>{student.birthdate ? formattedDate : "N/A"}</p>
                    </div>
                    <div className="border-2 border-black " id="case-emergency">
                      <div className="bg-black text-white p-1">
                        <p className=" ">IN CASE OF EMERGENCY PLS. NOTIFY</p>
                      </div>
                      <div className="px-1  ">
                        <div className="flex gap-1 font-bold">
                          <p>Name: </p>
                          <p className="">{student.contactperson || "N/A"}</p>
                        </div>
                        <div className="flex gap-1 font-bold ">
                          <p>Address: </p>
                          <p className="">{student.address || "N/A"}</p>
                        </div>
                        <div className="flex gap-1 font-bold">
                          <p>Tel. No.: </p>
                          <p className="">
                            {student.contactpersonnumber
                              ? formatPhoneNumber(student.contactpersonnumber)
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p
                      className="pt-[.8rem] text-[1.2rem] font-[600] text-center"
                      id="important"
                    >
                      IMPORTANT
                    </p>
                    <p className="px-1  font-[600] " id="content">
                      THIS CARD IS NON-TRANSFERABLE IT MUST BE WORN WHILE INSIDE
                      THE CAMPUS PREMISES.
                    </p>
                    <div className="flex flex-col mt-10 ">
                      <div className="text-center  mb-3  relative flex flex-col items-center justify-center h-[80px]">
                        <div className="absolute top-0 h-[70px]">
                          <img
                            src={student.signature}
                            alt="signature"
                            className="h-full w-full"
                          />
                        </div>
                        <div className="w-full absolute bottom-0">
                          <p className="signature ">SIGNATURE</p>
                        </div>
                      </div>

                      <div className="text-center  relative flex flex-col items-center justify-center h-[90px]">
                        <div className="absolute top-0 h-[70px]">
                          <img
                            src={RegistrarSignature}
                            alt="registrar signature"
                            className="h-full w-full"
                          />
                        </div>
                        <div className="w-full absolute bottom-0">
                          <p className="font-bold text-[1rem]">
                            MR. DARBY P ESBERANZATE
                          </p>
                          <p className="signature-registrar  bottom-0">
                            College Registrar
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </>
              ) : (
                <CardBody px={2}>
                  <div
                    class="grid grid-cols-3 border-2 border-black w-full "
                    id="personnel-back-card"
                  >
                    <div class="border-r-2 border-black text-center">
                      <p className="text-left  font-bold">HEIGHT</p>
                      <p className="text-[1.2rem]">
                        {" "}
                        {student.hgt ? student.hgt : "N/A"}
                      </p>
                    </div>
                    <div class="border-r-2 border-black text-center">
                      <p className="text-left  font-bold pl-1">BIRTHDATE</p>
                      <p> {student.birthdate ? formattedDate : "N/A"}</p>
                    </div>
                    <div class="text-center">
                      <p className="text-left  font-bold pl-1">WEIGHT</p>
                      <p className="text-[1.2rem]">
                        {" "}
                        {student.wgt ? student.wgt : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="border-2 border-black font-[600] "
                    id="personnel-back-card"
                  >
                    <p className="px-1 text-[1.1rem]">
                      In case of emergency pls., notify:
                    </p>

                    <div className="px-1 ">
                      <div className="flex gap-2">
                        <p>Name: </p>
                        <p className="">{student.contactperson || "N/A"}</p>
                      </div>
                      <div className="flex gap-2">
                        <p>Address: </p>
                        <p className="">{student.address || "N/A"}</p>
                      </div>
                      <div className="flex gap-2">
                        <p>Tel. No.: </p>
                        <p className="">
                          {student.contactpersonnumber
                            ? formatPhoneNumber(student.contactpersonnumber)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex font-[600]" id="personnel-back-card">
                    <div className="w-[50%] p-1 ">
                      THIS IS TO CERTIFY THAT THE PERSON WHOSE PHOTO AND
                      SIGNATURE APPEAR ON THIS CARD IS AN EMPLOYEE OF THIS
                      COLLEGE.
                    </div>
                    <div className="w-[50%] ">
                      <div class="flex flex-col border-2 border-black w-full">
                        <div class=" border-b border-black text-[1.2rem]">
                          <p class="text-left font-bold">GSIS</p>
                          <p className="text-center font-[600]">
                            {student.sss || "N/A"}
                          </p>
                        </div>

                        <div className="text-[1.2rem]">
                          <p class="text-left font-bold">TIN</p>
                          <p className="text-center font-[600]">
                            {student.tin || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    <div className="text-center  relative flex flex-col items-center justify-center h-[90px]">
                      <div className="absolute top-0 h-[80px]">
                        <img
                          src={student.signature}
                          alt="signature"
                          className="h-full w-full"
                        />
                      </div>
                      <div className="w-full absolute bottom-0">
                        <p className="signature">SIGNATURE</p>
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
