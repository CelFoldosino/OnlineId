/** @format */

import React from "react";
import InfoProfile from "./info-profile/InfoProfile";
import AccountTempoId from "./TemporaryId";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const UserProfile = () => {
  return (
    <Container maxW="container.xl" p={5}>
      <Tabs size="sm" variant="enclosed">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>TempoID</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InfoProfile />
          </TabPanel>
          <TabPanel>
            <AccountTempoId />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default UserProfile;
