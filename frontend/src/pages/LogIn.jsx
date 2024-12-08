/** @format */

import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  InputRightElement,
  InputGroup,
  Stack,
  FormHelperText,
  Select,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../components/context/Auth";
import bgImage from "../assets/bg2-1024x574.jpg";
import logo from "../assets/philscalogo.png";
import { login } from "../components/api/Login";
import OTPInput from "../components/Otp";
import useAuthStore from "../modules/auth";
import { verifyOtp } from "../components/api/otpVerify";

const LogIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyOtpLoading, setIsVerifyOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userToSignIn = allUser.find((user) => user.email === email);

  // Zustand token state and setter
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  const signIn = async () => {
    if (!role || !email || !password) {
      toast({
        title: "Fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!userToSignIn) {
      toast({
        title: "No accounts found",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (userToSignIn.email !== email || userToSignIn.password !== password) {
      toast({
        title: "Invalid credentials",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setIsLoading(true);
      const body = {
        email: email,
        password: password,
      };
      if (
        userToSignIn.password === password &&
        userToSignIn.role === role.toLowerCase()
      ) {
        const response = await login({ body });
        onOpen(); // Open OTP modal
      }
    } catch (error) {
      toast({
        title: "Error during authentication",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // OTP verification handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setIsVerifyOtpLoading(true);

    // Check if the OTP is complete
    if (otp.length < 6) {
      // Change this based on your OTP length
      toast({
        title: "OTP is incomplete",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setIsVerifyOtpLoading(false);
      return;
    }

    try {
      const body = {
        userId: userToSignIn._id,
        otpCode: otp,
      };
      const response = await verifyOtp({
        body,
      });

      // Store token in localStorage and update Zustand store
      localStorage.setItem("token", response.token);
      setToken(response.token);

      toast({
        title: "OTP verified successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      // navigate("/dashboard"); // Navigate to dashboard or appropriate page
    } catch (error) {
      toast({
        title: "Failed to verify OTP",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsVerifyOtpLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        };

        const response = await axios.get(`${globalUrl}/accounts/retrieveAll`, {
          headers: header,
        });

        setAllUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [globalUrl]);

  if (loading) {
    return (
      <div className="fixed flex justify-center items-center text-center h-[100vh] w-screen z-40 bg-white dark:bg-black">
        <ThreeDots
          height={200}
          width={200}
          color="#4fa94d"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return (
    <Box
      height="100vh"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(2px)",
        zIndex: -1,
      }}
    >
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-r, whiteAlpha.75, whiteAlpha.25)"
        sm={{ bg: "transparent" }}
        zIndex={0}
      ></Box>
      <Text
        fontSize="6xl"
        fontWeight="bold"
        position="absolute"
        top="20px"
        left="20px"
        color="white"
      >
        PhilSCA
      </Text>
      <Image
        src={logo}
        alt="Philsca Logo"
        boxSize="200px"
        objectFit="contain"
        position="absolute"
        top="20px"
        right="20px"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="white"
        p="40px" // Increased padding for a more spacious feel
        rounded="20px"
        width="350px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        shadow="lg" // Changed shadow for a more subtle effect
        zIndex={1}
      >
        <Text fontSize="2xl" fontWeight="bold" mb="6" color="blue.600">
          Log In
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            {" "}
            {/* Increased spacing for better separation */}
            <FormControl>
              <FormLabel color="blue.600" mb="1">
                Role
              </FormLabel>{" "}
              {/* Added a label for better clarity */}
              <Select
                name="role"
                placeholder="Select your role"
                onChange={handleChange}
                value={role}
                bg="blue.50"
                borderColor="blue.300"
                _focus={{
                  borderColor: "orange.300",
                  boxShadow: "0 0 0 1px orange.300",
                }}
              >
                <option value="student">Student</option>
                <option value="permanent_employee">Permanent Employee</option>
                <option value="cos_employee">COS Employee</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color="blue.600" mb="1">
                Email
              </FormLabel>
              <Input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={email}
                bg="blue.50"
                borderColor="blue.300"
                _focus={{
                  borderColor: "orange.300",
                  boxShadow: "0 0 0 1px orange.300",
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="blue.600" mb="1">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  onChange={handleChange}
                  value={password}
                  bg="blue.50"
                  borderColor="blue.300"
                  _focus={{
                    borderColor: "orange.300",
                    boxShadow: "0 0 0 1px orange.300",
                  }}
                />
                <InputRightElement>
                  <Button
                    onClick={handleShowPassword}
                    variant="link"
                    colorScheme="blue"
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              isLoading={isLoading}
              loadingText="Signing in..."
              colorScheme="orange"
              size="md"
              type="submit"
              mb={4}
              _hover={{ bg: "orange.500", color: "white" }}
            >
              Log In
            </Button>
          </Stack>
        </form>
      </Box>

      {/* OTP Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" justify="center" align="center" pt="20px">
              <VStack>
                <OTPInput otp={otp} setOtp={setOtp} />
                <Text>Please enter the 6-digit code sent to your email.</Text>
              </VStack>
            </Flex>
          </ModalBody>
          <ModalFooter
            display="flex" // Enables flexbox layout
            justifyContent="center" // Centers content horizontally
            alignItems="center" // Centers content vertically (useful if you have multiple items)
            // Ensures the footer takes the full width
            padding="1.5rem" // Optional: adds padding for spacing
          >
            <Button
              colorScheme="purple"
              width="100%"
              onClick={handleVerifyOtp}
              isLoading={isVerifyOtpLoading}
              loadingText="Verifying..."
            >
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LogIn;
