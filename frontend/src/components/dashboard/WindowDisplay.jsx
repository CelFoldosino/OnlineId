/** @format */

import React, { useState, useEffect, Suspense } from "react";
import { useData } from "../context/FetchAccountContext";
import { Box, Flex, Spinner } from "@chakra-ui/react";

const PreList = React.lazy(() => import("./windows/admin/pre-list/PreList"));
const idList = React.lazy(() => import("./windows/admin/id-list/idList"));
const GraphsAndAnalytics = React.lazy(() =>
  import("./windows/admin/graphs-analytics/GraphsAndAnalytics")
);
const Setting = React.lazy(() =>
  import("./windows/admin/setting/AdminSettings")
);
const Reports = React.lazy(() => import("./windows/admin/reports/Reports"));

const UserProfile = React.lazy(() =>
  import("./windows/user/user-profile/UserProfile")
);
const idLost = React.lazy(() => import("./windows/admin/id-lost/idLost"));
const ReportIdLost = React.lazy(() =>
  import("./windows/user/report-id-lost/ReportIdLost")
);

export const WindowDisplay = ({ tab, accountLogin }) => {
  const [display, setDisplay] = useState(null);
  const { loading } = useData();
  useEffect(() => {
    const role = accountLogin()?.role;

    if (role === "admin") {
      const components = {
        prelist: PreList,
        studlistid: idList,
        graphsandanalytics: GraphsAndAnalytics,
        idlost: idLost,
        reports: Reports,
        profile: Setting,
      };
      setDisplay(components[tab] || null);
    } else if (["student", "faculty", "staff"].includes(role)) {
      const employee = {
        profile: UserProfile,
        reportid: ReportIdLost,
      };
      setDisplay(employee[tab] || null);
    } else {
      setDisplay(null);
    }
  }, [tab, accountLogin]);

  return (
    <div className="h-full">
      <Suspense
        fallback={
          <Flex flexDir="column" justify="center" align="center" h="60vh">
            <Spinner size="xl" />
            <Box pt={5}>If takes too long reload the page...</Box>
          </Flex>
        }
      >
        {display && React.createElement(display)}
      </Suspense>
    </div>
  );
};
