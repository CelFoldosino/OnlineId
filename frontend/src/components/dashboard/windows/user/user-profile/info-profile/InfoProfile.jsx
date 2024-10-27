/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  WrapItem,
  Select,
  Spinner,
} from "@chakra-ui/react";
import {
  fetchAccountAPI,
  updateAccountAPI,
} from "../../../../../api/AccountsApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../../../../../context/FetchAccountContext";
import useAuthStore from "../../../../../../modules/auth";

const InfoProfile = ({}) => {
  const { data, setData } = useData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [images, setImages] = useState([]);
  const [signature, setSignature] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [course, setCourse] = useState("");
  const [position, setPosition] = useState("");
  const [designation, setDesignation] = useState("");
  const [hgt, setHgt] = useState("");
  const [wgt, setWgt] = useState("");
  const [sss, setSSS] = useState("");
  const [tin, setTin] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");
  const [schoolyear, setSchoolyear] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;
  const { userId } = useAuthStore();

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const user = accountLogin();
  const fullName = useMemo(() => {
    const firstName = user?.firstName || "";
    const middleName = user?.middlename || "";
    const lastName = user?.lastName || "";
    const suffix = user?.suffix || "";

    const name = `${firstName} ${middleName} ${lastName} ${suffix}`.trim();

    return name ? name : "";
  }, [user]);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
      setMiddlename(user.middlename || "");
      setCourse(user.course || "");
      setPosition(user.position || "");
      setDesignation(user.designation || "");
      setHgt(user.hgt || "");
      setWgt(user.wgt || "");
      setSSS(user.sss || "");
      setTin(user.tin || "");
      setContactPerson(user.contactperson || "");
      setContactPersonNumber(user.contactpersonnumber || "");
      setSchoolyear(user.schoolyear || "");
      setBirthdate(user.birthdate || "");
      setContactNumber(user.contactnumber || "");
      setAddress(user.address || "");
      // Add other fields as necessary
    }
  }, [user]);
  const uploadFiles = async () => {
    try {
      let cloudName = "dijhxviqe";
      const imageUrls = [];
      const signatureUrls = [];

      // Upload images
      for (const image of images) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uploadNews");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
        imageUrls.push(secure_url);
      }

      // Upload signatures
      for (const sig of signature) {
        const data = new FormData();
        data.append("file", sig);
        data.append("upload_preset", "uploadNews");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
        signatureUrls.push(secure_url);
      }

      // Prepare data to send
      const uploadData = {};
      if (imageUrls.length > 0) {
        uploadData.picture = imageUrls[0];
      }
      if (signatureUrls.length > 0) {
        uploadData.signature = signatureUrls[0];
      }

      // Check if uploadData is empty
      if (Object.keys(uploadData).length === 0) {
        throw new Error("No files to upload");
      }

      // Send data to the server
      await fetchUploadImage(uploadData);

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const fetchUploadImage = async (uploadData) => {
    const updatedUser = {
      picture: uploadData.picture || "",
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      course: course,
      schoolyear: schoolyear,
      birthdate: birthdate,
      signature: uploadData.signature || "",
      contactnumber: contactnumber,
      contactpersonnumber: contactPersonNumber,
      contactperson: contactPerson,
      address: address,
      position: position,
      designation: designation,
      hgt: hgt,
      wgt: wgt,
      sss: sss,
      tin: tin,
    };

    try {
      const response = await updateAccountAPI({
        _id: user._id,
        body: updatedUser,
      });
      if (response) {
        if (response) {
          const updatedData = data.map((el) =>
            el._id === user._id ? { ...el, ...updatedUser } : el
          );
          setData(updatedData);
          onClose(); // Close the modal after successful update
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      //
      if (images.length < 1 || signature.length < 1) {
        toast({
          title: "Please Fill All the Fields",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        await uploadFiles();

        toast({
          title: "Updated Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Failed to update",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setImages([selectedFiles]);
  };
  const handleSignature = (e) => {
    const selectedFiles = e.target.files[0];
    setSignature([selectedFiles]);
  };

  const birth = user.birthdate;
  const date = birth ? new Date(birth) : null;
  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  return (
    <Box key={user._id} h="100%">
      <SimpleGrid p={0}>
        <Card bg="#e9e8df">
          <CardHeader bg="#FFD700">
            <Flex gap={2}>
              <Box w="120px" h="100px">
                <WrapItem>
                  <Avatar size="xl" name={user.email} src={user.picture} />
                </WrapItem>
              </Box>
              <Box>
                <Heading as="h3" size="sm">
                  {user.firstname}
                </Heading>
                <Text>{user.email}</Text>
              </Box>
            </Flex>
          </CardHeader>

          <Divider borderColor="gray.400" />

          <CardBody bg="purple.50">
            <List spacing={3}>
              <ListItem>
                <ListIcon as={InfoIcon} color="#FFD700" />
                Name: {fullName}
              </ListItem>
              <ListItem>
                <ListIcon as={InfoIcon} color="#FFD700" />
                Email: {user.email}
              </ListItem>
              {["faculty", "staff"].includes(user.role) && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  Position: {user.position}
                </ListItem>
              )}
              {["faculty", "staff"].includes(user.role) && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  Designation: {user.designation}
                </ListItem>
              )}
              {["faculty", "staff"].includes(user.role) && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  HGT: {user.hgt}
                </ListItem>
              )}
              {["faculty", "staff"].includes(user.role) && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  WGT: {user.wgt}
                </ListItem>
              )}
              {["faculty", "staff"].includes(user.role) && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  SSS: {user.sss}
                </ListItem>
              )}
              {["faculty", "staff"].includes(user.role) && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  TIN: {user.tin}
                </ListItem>
              )}

              {user.role === "student" && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  Course: {user.course}
                </ListItem>
              )}
              {user.role === "student" && (
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  Schoolyear: {user.schoolyear}
                </ListItem>
              )}
              {
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  ContactPerson: {user.contactperson}
                </ListItem>
              }
              {
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  ContactPerson No.: {user.contactpersonnumber}
                </ListItem>
              }
              {
                <ListItem>
                  <ListIcon as={InfoIcon} color="#FFD700" />
                  Address: {user.address}
                </ListItem>
              }

              <ListItem>
                <ListIcon as={InfoIcon} color="#FFD700" />
                Date of Birth: {formattedDate}
              </ListItem>

              <ListItem>
                <ListIcon as={InfoIcon} color="#FFD700" />
                Contact No: {user.contactnumber}
              </ListItem>
              {/* Add more ListItem components for additional details */}
            </List>
          </CardBody>

          <Divider borderColor="gray.400" />

          <CardFooter>
            <HStack>
              <Button onClick={onOpen} variant="ghost" leftIcon={<EditIcon />}>
                Edit Personal Details
              </Button>
            </HStack>
          </CardFooter>
        </Card>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent overflowY="auto" maxH="500">
          <ModalHeader>Personal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxW="600px">
            <FormControl isRequired pb={3}>
              <FormLabel>Firstname:</FormLabel>
              <Input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Firstname"
              />
            </FormControl>
            <FormControl pb={3}>
              <FormLabel>Middlename:</FormLabel>
              <Input
                type="text"
                name="middlename"
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
                placeholder="Middlename"
              />
            </FormControl>
            <FormControl isRequired pb={3}>
              <FormLabel>Lastname:</FormLabel>
              <Input
                type="text"
                name="name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Lastname"
              />
            </FormControl>

            {["faculty", "staff"].includes(user.role) && (
              <FormControl isRequired>
                <FormLabel>Position:</FormLabel>
                <Input
                  type="text"
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Position"
                />
              </FormControl>
            )}
            {["faculty", "staff"].includes(user.role) && (
              <FormControl isRequired>
                <FormLabel>Designation:</FormLabel>
                <Input
                  type="text"
                  name="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Designation"
                />
              </FormControl>
            )}
            {["faculty", "staff"].includes(user.role) && (
              <FormControl isRequired>
                <FormLabel>HGT:</FormLabel>
                <Input
                  type="text"
                  name="hgt"
                  value={hgt}
                  onChange={(e) => setHgt(e.target.value)}
                  placeholder="Height"
                />
              </FormControl>
            )}
            {user.role === "student" && (
              <>
                <FormControl isRequired pb={3}>
                  <FormLabel>Course:</FormLabel>
                  <Select
                    name="course"
                    value={course}
                    placeholder="Select Course"
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="BSAeE">BSAeE</option>
                    <option value="BSAT">BSAT</option>
                    <option value="BSAMT">BSAMT</option>
                    <option value="BSAET">BSAET</option>
                    <option value="BSAIT">BSAIT</option>
                    <option value="BSAIS">BSAIS</option>
                    <option value="BSAvComm">BSAvComm</option>
                    <option value="BSAvLog">BSAvLog</option>
                    <option value="BSAvTour">BSAvTour</option>
                    <option value="BSAvSSM">BSAvSSM</option>
                  </Select>
                </FormControl>

                <FormControl isRequired pb={3}>
                  <FormLabel>Year:</FormLabel>
                  <Select
                    name="year"
                    value={schoolyear}
                    placeholder="Select Year"
                    onChange={(e) => setSchoolyear(e.target.value)}
                  >
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                  </Select>
                </FormControl>
              </>
            )}

            {["faculty", "staff"].includes(user.role) && (
              <FormControl isRequired pb={3}>
                <FormLabel>WGT:</FormLabel>
                <Input
                  type="text"
                  name="course"
                  value={wgt}
                  onChange={(e) => setWgt(e.target.value)}
                  placeholder="Weight"
                />
              </FormControl>
            )}
            {["faculty", "staff"].includes(user.role) && (
              <FormControl isRequired pb={3}>
                <FormLabel>SSS:</FormLabel>
                <Input
                  type="text"
                  name="course"
                  value={sss}
                  onChange={(e) => setSSS(e.target.value)}
                  placeholder="SSS"
                />
              </FormControl>
            )}
            {["faculty", "staff"].includes(user.role) && (
              <FormControl isRequired pb={3}>
                <FormLabel>TIN:</FormLabel>
                <Input
                  type="text"
                  name="course"
                  value={tin}
                  onChange={(e) => setTin(e.target.value)}
                  placeholder="TIN"
                />
              </FormControl>
            )}

            <FormControl pb={3}>
              <FormLabel>Date of Birth:</FormLabel>
              <Input
                type="date"
                name="birthdate"
                defaultValue={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired pb={3}>
              <FormLabel>Contact No.:</FormLabel>
              <Input
                type="tel"
                name="contactNo"
                value={contactnumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Contact Number"
              />
            </FormControl>
            <FormControl isRequired pb={3}>
              <FormLabel>ContactPerson:</FormLabel>
              <Input
                type="text"
                name="course"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Contact Person"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>ContactPerson No.:</FormLabel>
              <Input
                type="text"
                name="course"
                value={contactPersonNumber}
                onChange={(e) => setContactPersonNumber(e.target.value)}
                placeholder="Contact Person"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address:</FormLabel>
              <Input
                type="text"
                name="course"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Complete Address"
              />
            </FormControl>

            <div className="container mx-auto pt-10">
              <form className="">
                <div className="flex flex-col justify-center">
                  <div className="md:col-span-4 h-full">
                    <div className="flex flex-col justify-center items-center gap-3 p-5 border border-dashed border-black h-full w-[100%] dark:bg-white">
                      {images.length > 0 ? (
                        <div
                          className="flex flex-col justify-center items-center gap-3 text-center h-[170px]"
                          style={{
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                        >
                          <img
                            className="mx-auto max-h-[150px]"
                            src={URL.createObjectURL(images[0])}
                            alt={images[0].name}
                          />
                          {images.map((image) => {
                            return <p key={image.name}>{image.name}</p>;
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center">
                          <span className="text-[4rem]">
                            <i className="fa-solid fa-folder-open"></i>
                          </span>
                          <p className="font-semibold text-center">
                            Upload your image here
                          </p>
                        </div>
                      )}

                      <label
                        htmlFor="image-upload"
                        className="custom-file-upload"
                      >
                        Choose Files
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3 p-5 border border-dashed border-black h-full w-[100%] dark:bg-white">
                      {signature.length > 0 ? (
                        <div
                          className="flex flex-col justify-center items-center gap-3 text-center h-[170px]"
                          style={{
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                        >
                          <img
                            className="mx-auto max-h-[150px]"
                            src={URL.createObjectURL(signature[0])}
                            alt={signature[0].name}
                          />
                          {signature.map((sig) => {
                            return <p key={sig.name}>{sig.name}</p>;
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center">
                          <span className="text-[4rem]">
                            <i className="fa-solid fa-folder-open"></i>
                          </span>
                          <p className="font-semibold text-center">
                            Upload your signature here
                          </p>
                        </div>
                      )}

                      <label
                        htmlFor="signature-upload"
                        className="custom-file-upload"
                      >
                        Choose Files
                        <input
                          type="file"
                          accept="image/*"
                          id="signature-upload"
                          onChange={handleSignature}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>

            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InfoProfile;
