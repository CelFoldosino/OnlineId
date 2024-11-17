/** @format */

import {
  CheckCircleIcon,
  EditIcon,
  Icon,
  StarIcon,
  ViewIcon,
} from "@chakra-ui/icons";
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
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const ActiveUser = ({ filteredStudents, filteredFaculty, filteredStaff }) => {
  return (
    <Flex gap={5} flexWrap="wrap" flexDir={{ base: "column", md: "row" }}>
      <Card
        borderTopWidth="8px"
        borderTopColor="blue.700"
        bg="white"
        shadow="lg"
      >
        <CardHeader color="gray.700">
          <Flex gap={5}>
            <Box w="50px" h="50px">
              <CheckCircleIcon boxSize={50} color="blue.700" />
            </Box>
            <Box>
              <Heading as="h2" size="lg">
                Students
              </Heading>
              <Text fontSize="6xl" color="blue.700">
                {filteredStudents.length}
              </Text>
            </Box>
          </Flex>
        </CardHeader>

        <Divider borderColor="gray.200" />

        <CardFooter>
          <Text>List of all students register in the system</Text>
        </CardFooter>
      </Card>

      <Card
        borderTopWidth="8px"
        borderTopColor="blue.700"
        bg="white"
        shadow="lg"
      >
        <CardHeader color="gray.700">
          <Flex gap={5}>
            <Box w="50px" h="50px">
              <CheckCircleIcon boxSize={50} color="blue.700" />
            </Box>
            <Box>
              <Heading as="h2" size="lg">
                Permanent Employee
              </Heading>
              <Text fontSize="6xl" color="blue.700">
                {filteredFaculty.length}
              </Text>
            </Box>
          </Flex>
        </CardHeader>

        <Divider borderColor="gray.200" />

        <CardFooter>
          <HStack>
            <Text>List of all Permanent Employee register in the system</Text>
          </HStack>
        </CardFooter>
      </Card>

      <Card
        borderTopWidth="8px"
        borderTopColor="blue.700"
        bg="white"
        shadow="lg"
      >
        <CardHeader color="gray.700">
          <Flex gap={5}>
            <Box w="50px" h="50px">
              <CheckCircleIcon boxSize={50} color="blue.700" />
            </Box>
            <Box>
              <Heading as="h2" size="lg">
                COS Employee
              </Heading>
              <Text fontSize="6xl" color="blue.700">
                {filteredStaff.length}
              </Text>
            </Box>
          </Flex>
        </CardHeader>

        <Divider borderColor="gray.200" />

        <CardFooter>
          <HStack>
            <Text>List of all COS Employee register in the system</Text>
          </HStack>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default ActiveUser;
