/** @format */

import {
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useData } from "../../../../context/FetchAccountContext";
import ActiveUser from "./ActiveUser";
import ActiveId from "./ActiveId";

const GraphsAndAnalytics = () => {
  const { data } = useData();

  const filteredStudents = data.filter((account) => account.role === "student");
  const filteredFaculty = data.filter((account) => account.role === "faculty");
  const filteredStaff = data.filter((account) => account.role === "staff");
  const filteredIssuedId = data.filter(
    (account) => account.isIdIssued === true
  );
  const filteredNonIssuedId = data.filter(
    (account) => account.isIdIssued === false
  );

  return (
    <>
      <Tabs colorScheme="purple" variant="enclosed">
        <TabList py={10} px={5} bg="#e9e8df" boxShadow="md">
          <Tab _selected={{ color: "blue.700", bg: "#FFD700" }}>
            Active User
          </Tab>
          <Tab _selected={{ color: "blue.700", bg: "#FFD700" }}>ID Status</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <List>
              <ListItem>
                <ActiveUser
                  filteredStudents={filteredStudents}
                  filteredFaculty={filteredFaculty}
                  filteredStaff={filteredStaff}
                />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel>
            <List>
              <ListItem>
                <ActiveId
                  filteredIssuedId={filteredIssuedId}
                  filteredNonIssuedId={filteredNonIssuedId}
                />
              </ListItem>
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default GraphsAndAnalytics;
