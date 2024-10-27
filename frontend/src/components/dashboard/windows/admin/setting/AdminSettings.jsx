/** @format */

import React, { useEffect, useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { fetchAccountAPI, updateAccountAPI } from "../../../../api/AccountsApi";
import { useAuth } from "../../../../context/Auth";
import { useData } from "../../../../context/FetchAccountContext";
import useAuthStore from "../../../../../modules/auth";
import axios from "axios";

export default function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    middlename: "",
    lastname: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { userId } = useAuthStore();
  const { data, loading, setData } = useData();

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const user = accountLogin();
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      email: user?.email || "", // Safely set the email if user is defined
      firstname: user?.firstname || "", // Safely set the firstname if user is defined
      middlename: user?.middlename || "", // Safely set the middlename if user is defined
      lastname: user?.lastname || "", // Safely set the lastname if user is defined
    }));
  }, [user]);

  const uploadFiles = async () => {
    try {
      let cloudName = "dijhxviqe"; // Your Cloudinary cloud name
      const imageUrls = [];

      // If no images are selected, skip upload
      if (images.length === 0) {
        toast({
          title: "Upload Failed",
          description: "No images to upload, proceeding with user update",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        return null; // Return early
      }

      // Upload images
      for (const image of images) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uploadNews"); // Your upload preset
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url; // Corrected to access res.data
        imageUrls.push(secure_url);
      }

      // Return uploaded image URLs
      return imageUrls;
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload Failed",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      throw error; // Rethrow to handle in submit
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const uploadedImages = await uploadFiles();

      const uploadData = {
        picture: uploadedImages ? uploadedImages[0] : user.picture, // Use uploaded image or fallback to existing
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        middlename: formData.middlename,
      };

      // Send data to the server
      await fetchUploadImage(uploadData);

      toast({
        title: "Updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
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

  const fetchUploadImage = async (uploadData) => {
    const updatedUser = {
      picture: uploadData.picture || "",
      email: formData.email,
      firstname: formData.firstname,
      lastname: formData.lastname,
      middlename: formData.middlename,
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

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setImages([selectedFiles]);
  };
  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          <>
            <SimpleGrid key={user._id}>
              <Card borderTop="8px" borderColor="purple.400" bg="white">
                <CardHeader bg="purple.100">
                  <Flex gap={2}>
                    <Box w="120px" h="100px">
                      <WrapItem>
                        <Avatar
                          size="xl"
                          name={user.firstname}
                          src={user.picture}
                        />
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
                      Name:{" "}
                      {`${user.firstname} ${user.middlename} ${user.lastname}`}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={InfoIcon} color="#FFD700" />
                      Email: {user.email}
                    </ListItem>
                  </List>
                </CardBody>

                <Divider borderColor="gray.400" />

                <CardFooter borderBottom="8px" borderColor="purple.400">
                  <HStack>
                    <Button
                      onClick={onOpen}
                      variant="ghost"
                      leftIcon={<EditIcon />}
                    >
                      Edit Personal Details
                    </Button>
                  </HStack>
                </CardFooter>
              </Card>
            </SimpleGrid>{" "}
          </>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="lg" boxShadow="lg">
              <ModalHeader
                bg="blue.600"
                color="white"
                fontWeight="bold"
                borderTopRadius="lg"
              >
                Personal Details
              </ModalHeader>
              <ModalCloseButton color="white" />

              <ModalBody maxW="480px" p={6}>
                {/* Display existing photo if available */}
                {user.picture && (
                  <div className="flex justify-center mb-4">
                    <img
                      className="max-h-[150px] rounded"
                      src={user.picture}
                      alt="Current profile"
                    />
                  </div>
                )}

                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={formData.firstname}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">Middle Name</FormLabel>
                  <Input
                    type="text"
                    name="middlename"
                    placeholder="Enter your middle name"
                    value={formData.middlename}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, middlename: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                  />
                </FormControl>

                {/* Other form fields remain the same... */}
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
                      </div>
                    </div>
                  </form>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  bg="orange.400"
                  color="white"
                  _hover={{ bg: "orange.500" }}
                  w="100%"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
