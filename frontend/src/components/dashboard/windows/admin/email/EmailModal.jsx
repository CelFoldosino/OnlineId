/** @format */

import React, { useState, useRef } from "react";
import {
  Divider,
  Flex,
  Input,
  Textarea,
  Toast,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { sendEmail } from "../../../../api/EmailApi";

export const EmailModal = ({ isOpen, onClose, data, setData, mail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const toast = useToast();
  const handleSubmitEmail = async () => {
    setIsLoading(true);
    const body = {
      to: mail.email,
      subject: subject,
      text: text,
    };

    try {
      const response = await sendEmail({ body });
      toast({
        description: "Successfully send.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onClose(null);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" align="center" gap={3}>
            <Text className="w-[4rem] pt-1">To:</Text>
            <Input
              variant="flushed"
              type="text"
              value={mail.email}
              readOnly
              disabled
            />
          </Flex>
          <Flex justify="center" align="center" gap={3} pb={10}>
            <Text className="w-[4rem] pt-1">Subject:</Text>
            <Input
              variant="flushed"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Flex>
          <Textarea
            resize="none"
            placeholder="Your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <ModalFooter>
            <Button
              isLoading={isLoading}
              onClick={handleSubmitEmail}
              colorScheme="blue"
              mt={5}
            >
              Send
            </Button>
          </ModalFooter>
          {/* <form onSubmit={handleSubmitEmail}>
            <Stack spacing={4}>
            
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement w="4.5rem">
                    <Box
                      onClick={handleShowPassword}
                      _hover={{ cursor: "pointer", color: "#3182CE" }}
                      fontSize="2xl"
                      mb={2}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              
            </Stack>
          </form> */}

          {/* Student details to print */}
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
