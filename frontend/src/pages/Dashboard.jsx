/** @format */

import React, { useEffect, useState } from "react";
import {
  Box,
  useDisclosure,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  Divider,
} from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/Sidebar";
import { WindowDisplay } from "../components/dashboard/WindowDisplay";
import { useData } from "../components/context/FetchAccountContext";
import useAuthStore from "../modules/auth";
import Navbar from "../components/dashboard/Navbar";
import {
  FaUser,
  FaChartBar,
  FaBox,
  FaUsers,
  FaTachometerAlt,
  FaTh,
  FaList,
  FaExclamationTriangle,
  FaIdCard,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Lazy load WindowDisplay component
// const WindowDisplay = lazy(() =>
//   import("../components/dashboard/WindowDisplay")
// );

const DashBoard = () => {
  const { data } = useData();
  const [tab, setTab] = useState("");
  const { userId } = useAuthStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [islargerthanlg] = useMediaQuery("(min-width: 80em)"); // 62em = 992px

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const user = accountLogin();

  useEffect(() => {
    if (user && user.role) {
      const role = user.role;

      if (["faculty", "staff", "student"].includes(role)) {
        setTab("profile");
      } else {
        setTab("prelist");
      }
    } else {
      setTab("prelist");
    }
  }, [user]);

  const renderLinks = (user) => {
    if (user.role === "admin" && user._id === userId) {
      return (
        <React.Fragment key={user._id}>
          {[
            { tabName: "prelist", label: "Accounts", icon: FaUsers },
            { tabName: "studlistid", label: "ID List", icon: FaIdCard },
            {
              tabName: "graphsandanalytics",
              label: "Status Panel",
              icon: FaTh,
            },
            {
              tabName: "idlost",
              label: "ID Lost Record",
              icon: FaExclamationTriangle,
            },
            {
              tabName: "reports",
              label: "Report",
              icon: FaExclamationTriangle,
            },
            // { tabName: "settings", label: "Settings", icon: FaCog },
          ].map((item) => (
            <Link
              key={item.tabName}
              onClick={() => handleTabChange(item.tabName)}
            >
              <Flex
                align="center"
                gap={10}
                backgroundColor={tab === item.tabName ? "blue.500" : ""}
                borderRadius={5}
                p={4}
                mb={2}
                _hover={{ bg: "blue.500", borderRadius: 5, color: "white" }}
              >
                <Icon as={item.icon} fontSize="1.5rem" color="gray.300" />
                <Text as="p" color={tab === item.tabName ? "white" : ""}>
                  {item.label}
                </Text>
              </Flex>
            </Link>
          ))}
        </React.Fragment>
      );
    }
    return null;
  };

  const renderUserLinks = (user) => (
    <Box key={user._id}>
      {[
        {
          tabName: "reportid",
          label: "Report ID",
          icon: FaExclamationTriangle,
        },
      ].map((item) => (
        <Link key={item.tabName} onClick={() => handleTabChange(item.tabName)}>
          <Flex
            align="center"
            gap={10}
            backgroundColor={tab === item.tabName ? "blue.500" : ""}
            borderRadius={5}
            p={4}
            mb={2}
            _hover={{ bg: "blue.500", borderRadius: 5, color: "white" }}
          >
            <Icon as={item.icon} fontSize="1.5rem" color="gray.300" />
            <Text as="p" color={tab === item.tabName ? "white" : ""}>
              {item.label}
            </Text>
          </Flex>
        </Link>
      ))}
    </Box>
  );

  const handleTabChange = (tabName) => {
    setTab(tabName);
    onClose();
  };
  return (
    <>
      <Box display="flex" h="100vh" style={{ zIndex: 214 }}>
        {/* SIDEBAR */}
        {islargerthanlg && (
          <Box
            pos="fixed"
            left={0}
            top={0}
            w={{ xl: "20%" }}
            color="white"
            h="100%"
          >
            <SideBar
              renderLinks={renderLinks}
              renderUserLinks={renderUserLinks}
              tab={tab}
              setTab={setTab}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
        )}
        {/* RIGHT PANEL */}
        <Box flex="1" marginLeft={islargerthanlg ? "20%" : "0"}>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Navbar
            onOpen={onOpen}
            islargerthanlg={islargerthanlg}
            handleTabChange={handleTabChange}
          />

          <WindowDisplay tab={tab} accountLogin={accountLogin} />

          {/* </Suspense> */}
        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent bg="blue.700">
              <DrawerBody p={0}>
                <Box>
                  <Box p={5} color="white">
                    <Text fontSize="1.5rem">PHILSCA</Text>
                    <Text>
                      {user?.role === "admin"
                        ? "Administrator"
                        : user?.role === "student"
                        ? "Student"
                        : user?.role === "faculty" || user?.role === "staff"
                        ? "Employee"
                        : ""}
                    </Text>
                  </Box>
                  <Divider borderColor="whiteAlpha.300" />
                </Box>
                <Flex
                  flexDir="column"
                  justify="space-between"
                  py={5}
                  color="white"
                >
                  <Flex flexDir="column" px={3}>
                    {data.map(renderLinks)}
                    {data
                      .filter(
                        (user) =>
                          ["student", "faculty", "staff"].includes(user.role) &&
                          user._id === userId
                      )
                      .map(renderUserLinks)}
                  </Flex>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </>
  );
};

export default DashBoard;
