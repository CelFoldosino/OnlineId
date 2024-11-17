/** @format */

import React from "react";
import { useData } from "../../../../context/FetchAccountContext";
import {
  Avatar,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../../../../assets/philscalogo.png";
import useAuthStore from "../../../../../modules/auth";
import RegistrarSignature from "../../../../../assets/registrar_signature.png";
import PhilscaLogoCircle from "../../../../../assets/philsca-logo-circle.png";

const AccountTempoId = () => {
  const { data } = useData();
  const { userId } = useAuthStore();

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const user = accountLogin();
  const formatPhoneNumber = (number) => {
    // Pad the number to ensure it's 11 digits
    const paddedNumber = number.padStart(11, "0");
    // Format the number as 0943-348-5534
    return `${paddedNumber.slice(0, 4)}-${paddedNumber.slice(
      4,
      7
    )}-${paddedNumber.slice(7)}`;
  };
  const date = new Date(user.birthdate);

  console.log(user.firstname, user.lastname);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-wrap flex-col sm:flex-row gap-5">
      {/* front */}
      <div className="flex-shrink-0 h-auto">
        <Card
          maxW="sm"
          bg="#10145e"
          border="2px"
          borderRadius="lg"
          mb={4}
          w="320px"
          p={0}
        >
          <CardBody p={0}>
            <div>
              <div className="flex flex-col items-center">
                {user.role === "student" || user.role === "staff" ? (
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

              {user.role === "student" ? (
                <>
                  <Stack
                    direction="row"
                    align="center"
                    justify="space-between"
                    bg="#507889"
                    p="1"
                    w="full"
                  >
                    {user.role === "student" ? (
                      <>
                        <Stack align="center">
                          <Image
                            src={logo}
                            alt="Philsca Logo"
                            boxSize="100px"
                          />
                          {user.role === "student" ? (
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

                    {user.role === "student" ? (
                      <>
                        <Stack align="center">
                          {user.picture === "" ? (
                            <Avatar
                              src={user.picture}
                              alt="profile"
                              boxSize="100px"
                            />
                          ) : (
                            <Image
                              src={user.picture}
                              alt="profile"
                              boxSize="150px"
                              mr={4}
                            />
                          )}
                          {user.role === "student" ? (
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
              {user.role === "staff" ? (
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
                        <Image src={logo} alt="Philsca Logo" boxSize="100px" />
                      </Stack>
                    </>

                    <>
                      <Stack align="center">
                        {user.picture === "" ? (
                          <Avatar
                            src={user.picture}
                            alt="profile"
                            boxSize="100px"
                          />
                        ) : (
                          <Image
                            src={user.picture}
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

              {user.role === "faculty" ? (
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
                        {user.picture === "" ? (
                          <Avatar
                            src={user.picture}
                            alt="profile"
                            boxSize="100px"
                          />
                        ) : (
                          <img
                            src={user.picture}
                            alt="profile"
                            className="h-[130px] w-[130px]"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center  mt-3">
                      {user.firstname === "" && user.lastname === "" ? (
                        <p class="text-white">N/A</p>
                      ) : (
                        <Heading
                          size="md"
                          color="white"
                        >{`${user.firstname} ${user.middlename} ${user.lastname}`}</Heading>
                      )}
                      <p class="text-yellow-300 text-[.9rem]">Employee Name</p>
                      {user.schoolid === "" ? (
                        <p class="text-white ">N/A</p>
                      ) : (
                        <Text fontSize="lg" color="white">
                          {user.schoolid}
                        </Text>
                      )}
                      <p class="text-yellow-300 text-[.9rem]">ID Number</p>
                      {user.position === "" ? (
                        <p class="text-white">N/A</p>
                      ) : (
                        <Text fontSize="lg" color="white">
                          {user.position}
                        </Text>
                      )}
                      <p class="text-yellow-300 text-[.9rem]">Positions</p>
                      {user.designation === "" ? (
                        <p class="text-white ">N/A</p>
                      ) : (
                        <Text fontSize="lg" color="white">
                          {user.designation}
                        </Text>
                      )}
                      <p class="text-yellow-300 text-[.9rem]">Designation</p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {user.role === "staff" ? (
                <>
                  <div className="flex flex-col justify-center items-center  bg-white text-black">
                    {user.firstname === "" || user.lastname === "" ? (
                      <p>N/A</p>
                    ) : (
                      <p className="uppercase text-[1.1rem] font-bold">{`${user.firstname} ${user.middlename} ${user.lastname}`}</p>
                    )}
                    <p class="text-black text-[.9rem]">EMPLOYEE NAME</p>
                    {user.schoolid === "" ? (
                      <p>N/A</p>
                    ) : (
                      <p className="uppercase text-[1.1rem] font-bold">
                        {user.schoolid}
                      </p>
                    )}
                    <p class="text-black text-[.9rem]">EMPLOYEE NUMBER</p>
                    {user.position === "" ? (
                      <p>N/A</p>
                    ) : (
                      <p className="uppercase text-[1.1rem] font-bold">
                        {user.position}
                      </p>
                    )}
                    <p class="text-black text-[.9rem]">POSITION</p>
                  </div>
                </>
              ) : (
                <></>
              )}

              {user.role === "student" ? (
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
                    {user.firstname === "" && user.lastname === "" ? (
                      <Text>N/A</Text>
                    ) : (
                      <Heading
                        size="md"
                        color="black"
                      >{`${user.firstname} ${user.middlename} ${user.lastname}`}</Heading>
                    )}

                    {user.schoolid === "" ? (
                      <Text>N/A</Text>
                    ) : (
                      <Text fontSize="lg" color="black">
                        {user.schoolid}
                      </Text>
                    )}

                    {user.role === "student" ? (
                      <>
                        {user.course === "" ? (
                          <Text>N/A</Text>
                        ) : (
                          <Text fontSize="lg" color="black">
                            {user.course}
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
      </div>
      {/* back */}
      <Card maxW="sm" border="2px" borderRadius="lg" w="320px">
        {user.role === "student" ? (
          <>
            <CardBody px={2}>
              <div className="flex gap-3 pb-2 items-center">
                <span className="text-[.9rem] font-[400]">DATE OF BIRTH: </span>
                <p className="font-bold">
                  {user.birthdate ? formattedDate : "N/A"}
                </p>
              </div>
              <div className="border-2 border-black">
                <div className="bg-black text-white">
                  <p className="px-2">IN CASE OF EMERGENCY PLS. NOTIFY</p>
                </div>
                <div className="px-2">
                  <div className="flex gap-2">
                    <p className=" font-[400]">Name: </p>
                    <p className=" font-[600]">{user.contactperson || "N/A"}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className=" font-[400]">Address: </p>
                    <p className=" font-[600]">{user.address || "N/A"}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className=" font-[400]">Tel. No.: </p>
                    <p className=" font-[600]">
                      {user.contactpersonnumber
                        ? formatPhoneNumber(user.contactpersonnumber)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="pt-[1.5rem] text-[1.2rem] font-[600] text-center">
                IMPORTANT
              </p>
              <p className="px-2 font-[500] pb-[3.5rem]">
                THIS CARD IS NON-TRANSFERABLE IT MUST BE WORN WHILE INSIDE THE
                CAMPUS PREMISES.
              </p>
              <div className="flex flex-col">
                <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[70px]">
                  <div className="absolute top-0 h-[60px]">
                    <img
                      src={user.signature}
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
                <p> {user.hgt ? user.hgt : "N/A"}</p>
              </div>
              <div class="border-r-2 border-black text-center">
                <p className="text-left text-[.9rem] font-bold pl-1">
                  BIRTHDATE
                </p>
                <p> {user.birthdate ? formattedDate : "N/A"}</p>
              </div>
              <div class="text-center">
                <p className="text-left text-[.9rem] font-bold pl-1">WEIGHT</p>
                <p> {user.wgt ? user.wgt : "N/A"}</p>
              </div>
            </div>
            <div className="border-2 border-black">
              <p className="px-2">IN CASE OF EMERGENCY PLS. NOTIFY</p>

              <div className="px-2">
                <div className="flex gap-2">
                  <p className=" font-[400]">Name: </p>
                  <p className=" font-[600]">{user.contactperson || "N/A"}</p>
                </div>
                <div className="flex gap-2">
                  <p className=" font-[400]">Address: </p>
                  <p className=" font-[600]">{user.address || "N/A"}</p>
                </div>
                <div className="flex gap-2">
                  <p className=" font-[400]">Tel. No.: </p>
                  <p className=" font-[600]">
                    {user.contactpersonnumber
                      ? formatPhoneNumber(user.contactpersonnumber)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-[50%] p-1 text-[.9rem] font-[500]">
                THIS IS TO CERTIFY THAT THE PERSON WHOSE PHOTO AND SIGNATURE
                APPEAR ON THIS CARD IS AN EMPLOYEE OF THIS COLLEGE.
              </div>
              <div className="w-[50%]">
                <div class="flex flex-col border-2 border-black w-full">
                  <div class=" border-b border-black">
                    <p class="text-left font-bold">GSIS</p>
                    <p className="text-center font-[600]">
                      {user.sss || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p class="text-left font-bold">TIN</p>
                    <p className="text-center font-[600]">
                      {user.tin || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[70px]">
                <div className="absolute top-0 h-[60px]">
                  <img
                    src={user.signature}
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
  );
};

export default AccountTempoId;