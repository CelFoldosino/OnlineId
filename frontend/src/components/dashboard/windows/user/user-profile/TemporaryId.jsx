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
          
         w="207px"
              h='326px'
          p={0}
        >
          <CardBody p={0}>
            <div>
              <div className="flex flex-col items-center">
                {user.role === "student" || user.role === "cos_employee" ? (
                  <>
                  <p className="text-[.8rem] text-white">
                    Republic of the Philippines
                  </p>
                {user.role === 'student' ? (<><p className=" id-header  text-[.812rem]">
                    PHILIPPINE STATE COLLEGE <span className="block">OF AERONAUTICS</span>
                  </p></>) : user.role === 'cos_employee' ? (<>
                    <p className=" id-header  text-[.5rem]">
                    PHILIPPINE STATE COLLEGE OF AERONAUTICS
                  </p>
                  </>) : (<> </>)}
                  

                  <p className="text-white text-[.6rem] pb-2">
                    Piccio Garden, Villamor. Pasay City
                  </p>
                </>

                  
                ) : (
                  <>
                  <p className="text-[.6rem]  text-white">
                    Republic of the Philippines
                  </p>
                  <p className="text-[.5rem] id-header">
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
                            
                            <p className="text-yellow-300 text-[.8rem]">SY-2023-2024</p>
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
                     <Stack align="center" justify="center">
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
                           boxSize="100px"
                          
                         />
                       )}
                       {user.role === "student" ? (
                         <>
                           
                           <p className="text-yellow-300 text-[.7rem]">1st Sem./2nd Sem.</p>
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
              {user.role === "cos_employee" ? (
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
                                boxSize="100px"
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

              {user.role === "permanent_employee" ? (
                <>
                  {" "}
                  <div>
                        <div className="flex justfiy-between px-2">
                          <div className="h-[50px] w-[40px]">
                            <img
                              src={logo}
                              alt="Philsca Logo"
                              className="w-full h-full"
                            />
                          </div>
                          <div className="mt-5 text-[.6rem] text-white">
                            <p>Piccio Garden, Villamor. Pasay City</p>
                          </div>
                        </div>
                        <div className="flex justify-between gap-2 px-3">
                          <div >
                            <img
                              src={PhilscaLogoCircle}
                              alt=""
                              className="h-[90px] w-full"
                            />
                          </div>
                          <div >
                            {user.picture === "" ? (
                              <Avatar
                                src={user.picture}
                                alt="profile"
                                boxSize="90px"
                              />
                            ) : (
                              <img
                                src={user.picture}
                                alt="profile"
                                className="h-[90px] w-80px]"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center text-white ">
                          
                          {user.firstname === "" &&
                          user.lastname === "" ? (
                            <p class="text-white text-[.9rem]">N/A</p>
                          ) : (
                            

                            <h3 className="text-[.9rem]" 
                            
                          >{`${user.firstname} ${user.middlename} ${user.lastname}`}</h3>
                          )}
                          <p class="text-yellow-300 text-[.7rem]">
                            Employee Name
                          </p>
                          {user.schoolid === "" ? (
                            <p class="text-white text-[.9rem]">N/A</p>
                          ) : (
                            
                            <p className="text-[.9rem]">
                            {user.schoolid}
                          </p>
                          )}
                          <p class="text-yellow-300 text-[.7rem]">ID Number</p>
                          {user.position === "" ? (
                            <p class="text-white text-[.9rem]">N/A</p>
                          ) : (
                           
                            <p className=" text-[.9rem]">
                            {user.position}
                          </p>
                          )}
                          <p class="text-yellow-300 text-[.7rem]">Positions</p>
                          {user.designation === "" ? (
                            <p class="text-white text-[.9rem]">N/A</p>
                          ) : (
                            
                            <p className="text-[.9rem]">{user.designation}</p>
                          )}
                          <p class="text-yellow-300 text-[.7rem]">
                            Designation
                          </p>
                        </div>
                      </div>
                </>
              ) : (
                <></>
              )}

              {user.role === "cos_employee" ? (
                <>
                  <div className="flex flex-col justify-center items-center custom-bg text-black h-[146px] ">
                        <div className="text-content">
                          {!user.firstname || !user.lastname ? (
                            <p className="text-[.9rem]">N/A</p>
                          ) : (
                            <p className="uppercase text-[.9rem] font-bold">
                              {`${user.firstname} ${user.middlename} ${user.lastname}`}
                            </p>
                          )}
                          <p className="text-black text-[.7rem]">
                            EMPLOYEE NAME
                          </p>
                          {user.schoolid === "" ? (
                            <p className="text-[.9rem]">N/A</p>
                          ) : (
                            <p className="uppercase text-[.9rem] font-bold">
                              {user.schoolid}
                            </p>
                          )}
                          <p className="text-black text-[.7rem]">
                            EMPLOYEE NUMBER
                          </p>
                          {user.position === "" ? (
                            <p className="text-[.9rem]">N/A</p>
                          ) : (
                            <p className="uppercase text-[.9rem] font-bold">
                              {user.position}
                            </p>
                          )}
                          <p className="text-black text-[.7rem]">POSITION</p>
                        </div>
                      </div>
                </>
              ) : (
                <></>
              )}

              {user.role === "student" ? (
                <>
                   <div className="border border-orange-500 flex flex-col items-center justify-center m-2 bg-white font-bold">
                    {user.firstname === "" && user.lastname === "" ? (
                          <p className="name">N/A</p>
                        ) : (
                          <h3 className="name text-center"
                            
                          >{`${user.firstname} ${user.middlename} ${user.lastname}`}</h3>
                        )}

                        {user.schoolid === "" ? (
                          <p className="school-id">N/A</p>
                        ) : (
                          <p className="school-id">
                            {user.schoolid}
                          </p>
                        )}

                        {user.role === "student" ? (
                          <>
                            {user.course === "" ? (
                              <p className="program">N/A</p>
                            ) : (
                              <p className="program">
                                {user.course}
                              </p>
                            )}
                          </>
                        ) : (
                          <></>
                        )}

                    </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      {/* back */}
      
      <Card maxW="sm" border="2px" borderRadius="lg" w="207px" h='326px'>
  {user.role === "student" ? (
    <>
      <CardBody px={2}>
        <div className="flex gap-2 pb-2 items-center text-[.6rem] font-bold" id="birthDate">
          <span className=" ">
            DATE OF BIRTH:{" "}
          </span>
          <p>
            {user.birthdate ? formattedDate : "N/A"}
          </p>
        </div>
        <div className="border-2 border-black " id="case-emergency">
          <div className="bg-black text-white p-1">
            <p className=" text-[.6rem] ">IN CASE OF EMERGENCY PLS. NOTIFY</p>
          </div>
          <div className="px-1 text-[.7rem] ">
            <div className="flex gap-1 font-bold">
              <p>Name: </p>
              <p className="text-[.6rem]">
                {user.contactperson || "N/A"}
              </p>
            </div>
            <div className="flex gap-1 font-bold ">
              <p >Address: </p>
              <p className="text-[.6rem]">
                {user.address || "N/A"}
              </p>
            </div>
            <div className="flex gap-1 font-bold">
              <p >Tel. No.: </p>
              <p className="text-[.6rem]">
                {user.contactpersonnumber
                  ? formatPhoneNumber(user.contactpersonnumber)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <p className="pt-[.8rem] text-[.9rem] font-[600] text-center" id="important">
          IMPORTANT
        </p>
        <p className="px-1 text-[.6rem] font-[600] " id="content">
          THIS CARD IS NON-TRANSFERABLE IT MUST BE WORN WHILE INSIDE
          THE CAMPUS PREMISES.
        </p>
        <div className="flex flex-col">
          <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[50px]">
            <div className="absolute top-0 h-[40px]">
              <img
                src={user.signature}
                alt="signature"
                className="h-full w-full"
              />
            </div>
            <div className="w-full absolute bottom-0">
              <p className="signature ">SIGNATURE</p>
            </div>
          </div>

          <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[60px]">
            <div className="absolute top-0 h-[40px]">
              <img
                src={RegistrarSignature}
                alt="registrar signature"
                className="h-full w-full"
              />
            </div>
            <div className="w-full absolute bottom-0">
              <p className="font-bold text-[.7rem]">MR. DARBY P ESBERANZATE</p>
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
      <div className="grid grid-cols-3 border-2 border-black w-full text-[.5rem] " id="personnel-back-card">
        <div className="border-r-2 border-black text-center">
          <p className="text-left  font-bold">HEIGHT</p>
          <p className="text-[.7rem]"> {user.hgt ? user.hgt : "N/A"}</p>
        </div>
        <div className="border-r-2 border-black text-center">
          <p className="text-left  font-bold pl-1">
            BIRTHDATE
          </p>
          <p> {user.birthdate ? formattedDate : "N/A"}</p>
        </div>
        <div className="text-center">
          <p className="text-left  font-bold pl-1 ">
            WEIGHT
          </p>
          <p className="text-[.7rem]"> {user.wgt ? user.wgt : "N/A"}</p>
        </div>
      </div>
      <div className="border-2 border-black font-[600] h-[80px]"  id="personnel-back-card" >
        <p className="px-1 text-[.7rem]">In case of emergency pls., notify:</p>

        <div className="px-1 text-[.6rem]">
          <div className="flex gap-2">
            <p >Name: </p>
            <p className="text-[.6rem]">
              {user.contactperson || "N/A"}
            </p>
          </div>
          <div className="flex gap-2">
            <p >Address: </p>
            <p className="text-[.6rem]">
              {user.address || "N/A"}
            </p>
          </div>
          <div className="flex gap-2">
            <p >Tel. No.: </p>
            <p className="text-[.6rem]">
              {user.contactpersonnumber
                ? formatPhoneNumber(user.contactpersonnumber)
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex font-[600]" id="personnel-back-card"  >
        <div className="w-[50%] p-1 text-[.4rem]">
          THIS IS TO CERTIFY THAT THE PERSON WHOSE PHOTO AND
          SIGNATURE APPEAR ON THIS CARD IS AN EMPLOYEE OF THIS
          COLLEGE.
        </div>
        <div className="w-[50%] text-[.5rem] ">
          <div className="flex flex-col border-2 border-black w-full">
            <div className=" border-b border-black">
              <p className="text-left font-bold">GSIS</p>
              <p className="text-center font-[600]">
                {user.sss || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-left font-bold">TIN</p>
              <p className="text-center font-[600]">
                {user.tin || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[50px]">
          <div className="absolute top-0 h-[40px]">
            <img
              src={user.signature}
              alt="signature"
              className="h-full w-full"
            />
          </div>
          <div className="w-full absolute bottom-0">
            <p className="signature">SIGNATURE</p>
          </div>
        </div>

        <div className="text-center text-[.900rem]  relative flex flex-col items-center justify-center h-[60px]">
          
          <div className="w-full absolute bottom-0">
            <p className="font-bold text-[.7rem]">DR. MARWIN M. DELACRUZ</p>
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
