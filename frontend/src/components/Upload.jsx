/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "./context/Auth";
import { fetchAccountAPI } from "./api/AccountsApi";
import { Spinner } from "@chakra-ui/react";
import useAuthStore from "../modules/auth";
import { useData } from "./context/FetchAccountContext";

export const Upload = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");

  const { userId } = useAuthStore();
  const { data } = useData();

  const navigate = useNavigate();
  const toast = useToast();
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const user = accountLogin();

  const fetchAllUsers = async () => {
    try {
      const data = await fetchAccountAPI();
      setAllUsers(data.filter((el) => el._id === userId));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const uploadFiles = async () => {
    setLoading(true);

    try {
      let cloudName = "dijhxviqe";
      for (const image of images) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uploadNews");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
        user.picture = secure_url;
        await fetchUploadImage(secure_url);
      }

      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  const fetchUploadImage = async (imageSecureUrl) => {
    const body = {
      affidavit: imageSecureUrl,
      message: message,
    };

    const userSignin = userId;

    try {
      let url = `${globalUrl}/accounts/update/${userSignin}`;
      let method = "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = async () => {
    if (images.length < 1) {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      await uploadFiles();
      toast({
        title: "Uploaded",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setMessage("");
      setImages("");
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
        <section className="font-poppins">
          <Flex gap={5} className="mb-6">
            <FormControl>
              <FormLabel className="text-blue-600">Firstname</FormLabel>
              <Input
                name="firstname"
                defaultValue={user.firstname ? user.firstname : ""}
                readOnly
                className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </FormControl>
            <FormControl>
              <FormLabel className="text-blue-600">Middlename</FormLabel>
              <Input
                name="suffix"
                defaultValue={user.middlename ? user.middlename : ""}
                readOnly
                className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </FormControl>
            <FormControl>
              <FormLabel className="text-blue-600">Lastname</FormLabel>
              <Input
                name="lastname"
                defaultValue={user.lastname ? user.lastname : ""}
                readOnly
                className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </FormControl>
          </Flex>
          <FormControl pt={5}>
            <FormLabel htmlFor="my-textarea" className="text-blue-600">
              Message
            </FormLabel>
            <Textarea
              id="my-textarea"
              placeholder="Enter your text here"
              resize="none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </FormControl>

          <div className="container mx-auto pt-10">
            <form>
              <div className="flex flex-col justify-center">
                <div className="md:col-span-4 h-full">
                  <div className="flex flex-col justify-center items-center gap-3 p-5 border border-dashed border-orange-500 h-full w-full bg-gray-100 rounded-lg">
                    {images.length > 0 ? (
                      <div
                        className="flex flex-col justify-center items-center gap-3 text-center h-[170px]"
                        style={{
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        <img
                          className="mx-auto max-h-[150px] rounded shadow-md"
                          src={URL.createObjectURL(images[0])}
                          alt={images[0].name}
                        />
                        {images.map((image) => (
                          <p
                            key={image.name}
                            className="text-blue-600 font-semibold"
                          >
                            {image.name}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        <span className="text-[4rem] text-orange-500">
                          <i className="fa-solid fa-folder-open"></i>
                        </span>
                        <p className="font-semibold text-center text-gray-700">
                          Upload your image here
                        </p>
                      </div>
                    )}

                    <label
                      htmlFor="actual-btn"
                      className="custom-file-upload bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
                    >
                      Choose Files
                      <input
                        type="file"
                        accept="image/*"
                        id="actual-btn"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <Box textAlign="center">
                  <Button
                    colorScheme="orange"
                    width="25%"
                    style={{ marginTop: 15 }}
                    onClick={handleSubmit}
                    isLoading={loading}
                    className="hover:bg-orange-600 transition duration-200"
                  >
                    Post
                  </Button>
                </Box>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};
