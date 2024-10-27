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

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-wrap flex-col sm:flex-row gap-5">
      {/* front */}
      <Card maxW="sm" bg="#050C9C" border="2px" borderRadius="lg" w="320px">
        <CardBody p={0}>
          <Stack spacing="4" align="center" w="full">
            <Text size="xs" color="white" textAlign="center" mt="5">
              Republic of the Philippines
            </Text>
            <Heading size="md" color="yellow.400" textAlign="center" mt="-4">
              PHILIPPINE STATE COLLEGE
            </Heading>
            <Heading size="md" color="yellow.400" textAlign="center" mt="-4">
              OF AERONAUTICS
            </Heading>
            <Text
              fontSize="sm"
              fontWeight="light"
              color="white"
              textAlign="center"
              mt="-5"
            >
              Piccio Garden, Villamor. Pasay City
            </Text>

            <Stack
              direction="row"
              align="center"
              justify="space-between"
              bg="#507889"
              p="4"
              w="full"
            >
              <Stack align="center">
                <Image src={logo} alt="Philsca Logo" boxSize="100px" />
                {user.role === "student" ? (
                  <>
                    <Text fontSize="md" color="yellow.400">
                      SY-2023-2024
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </Stack>
              <Stack align="center">
                {user.picture === "" ? (
                  <Avatar src={user.picture} alt="profile" boxSize="100px" />
                ) : (
                  <Image src={user.picture} alt="profile" boxSize="150px" />
                )}
                {user.role === "student" ? (
                  <>
                    <Text fontSize="md" color="yellow.400">
                      1st Sem / 2nd Sem
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>

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
                <Heading size="md" color="black">
                  {`${user.firstname} ${user.middlename} ${user.lastname}`}
                </Heading>
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
              ) : user.role === "staff" || user.role === "faculty" ? (
                <>
                  {user.position === "" ? (
                    <Text>N/A</Text>
                  ) : (
                    <Text fontSize="lg" color="black">
                      {user.position}
                    </Text>
                  )}
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </CardBody>
      </Card>
      {/* back */}
      <Card maxW="sm" border="2px" borderRadius="lg" w="320px">
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
                <p className="  font-[400]">Name: </p>
                <p className=" font-[600]">{user.contactperson || "N/A"}</p>
              </div>
              <div className="flex gap-2">
                <p className=" font-[400]">Address: </p>
                <p className=" font-[600]">{user.address || "N/A"}</p>
              </div>
              <div className="flex gap-2">
                <p className=" font-[400]">Tel. No.: </p>
                <p className=" font-[600]">
                  {formatPhoneNumber(user?.contactpersonnumber || "")}
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
      </Card>
    </div>
  );
};

export default AccountTempoId;
