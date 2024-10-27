/** @format */

// /** @format */

// import {
//   Box,
//   Flex,
//   Text,
//   Avatar,
//   Button,
//   VStack,
//   Heading,
//   useDisclosure,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   FormControl,
// } from "@chakra-ui/react";
// import { MdAccountCircle } from "react-icons/md";
// import { useData } from "../../../../../context/FetchAccountContext";
// import useAuthStore from "../../../../../../modules/auth";
// import { useEffect, useMemo, useState } from "react";

// const StudentProfile = () => {

//   const { data } = useData();
//   const { userId } = useAuthStore();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const accountLogin = () => {
//     return data.find((d) => d._id === userId);
//   };
//   const userLogin = accountLogin();

//   return (
//     <Box>
//       <Heading as="h2" pb={8} fontSize="2xl" fontWeight="medium">
//         Student Profile
//       </Heading>

//       <Box border="1px solid #ddd" borderRadius="lg">
//         <Flex direction={{ base: "column", md: "row" }}>
//           {/* Left side: Avatar and Edit button */}
//           <Box
//             w={{ base: "100%", md: "30%" }}
//             borderRight={{ md: "2px solid #e2e2e2" }}
//             p={4}
//           >
//             <Flex direction="column" align="center">
//               <Avatar
//                 size="2xl"
//                 name={userLogin?.email}
//                 src={userLogin?.picture}
//                 icon={<MdAccountCircle size="100" />}
//                 bg="blue.500"
//               />
//               <Text pt={4} fontSize="lg" fontWeight="500">
//                 {fullName}
//               </Text>
//               <Button
//                 mt={4}
//                 colorScheme="blue"
//                 width="100%"
//                 size="sm"
//                 onClick={onOpen()}
//               >
//                 Edit Profile
//               </Button>
//             </Flex>
//           </Box>

//           {/* Right side: Info */}
//           <Box w={{ base: "100%", md: "70%" }} p={4}>
//             <VStack spacing={6} align="start" w="100%">
//               {/* Student Info */}
//               <Box w="100%">
//                 <Heading
//                   size="md"
//                   textTransform="uppercase"
//                   mb={2}
//                   p={1}
//                   borderRadius={5}
//                   color="blue.400"
//                   bg="blue.100"
//                 >
//                   Student Info
//                 </Heading>
//                 <Flex
//                   direction={{ base: "column", md: "row" }}
//                   justify="space-between"
//                   flexWrap="wrap"
//                   gap={5}
//                   w="100%"
//                 >
//                   <Box>
//                     <Text fontWeight="bold" opacity="0.8">
//                       Student ID
//                     </Text>
//                     <Text>{userLogin?.schoolid || "N/A"}</Text>
//                   </Box>
//                   <Box>
//                     <Text fontWeight="bold" opacity="0.8">
//                       Course
//                     </Text>
//                     <Text>{userLogin?.course || "N/A"}</Text>
//                   </Box>
//                   <Box>
//                     <Text fontWeight="bold" opacity="0.8">
//                       School Year
//                     </Text>
//                     <Text>{userLogin?.schoolYear || "N/A"}</Text>
//                   </Box>
//                   <Box>
//                     <Text fontWeight="bold" opacity="0.8">
//                       Birthdate
//                     </Text>
//                     <Text>{userLogin?.birthDate || "N/A"}</Text>
//                   </Box>
//                 </Flex>
//               </Box>

//               {/* Emergency Info */}
//               <Box w="100%">
//                 <Heading
//                   size="md"
//                   textTransform="uppercase"
//                   mb={2}
//                   p={1}
//                   borderRadius={5}
//                   color="blue.400"
//                   bg="blue.100"
//                 >
//                   Emergency Info
//                 </Heading>
//                 <Flex
//                   direction={{ base: "column", md: "row" }}
//                   justify="space-between"
//                   gap={5}
//                   flexWrap="wrap"
//                   w="100%"
//                 >
//                   <Box>
//                     <Text fontWeight="bold" opacity="0.8">
//                       Contact No.
//                     </Text>
//                     <Text>{userLogin?.contactnumber || "N/A"}</Text>
//                   </Box>
//                   <Box>
//                     <Text fontWeight="bold" opacity="0.8">
//                       Contact Person
//                     </Text>
//                     <Text>{userLogin?.contactperson || "N/A"}</Text>
//                   </Box>
//                   <Box>
//                     <Text fontWeight="bold" opacity="0.8">
//                       Address
//                     </Text>
//                     <Text>{userLogin?.address || "N/A"}</Text>
//                   </Box>
//                 </Flex>
//               </Box>

//               {/* Address */}
//             </VStack>
//           </Box>
//         </Flex>
//       </Box>
//     </Box>
//   );
// };

// export default StudentProfile;
