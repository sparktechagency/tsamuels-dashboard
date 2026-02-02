import { useState } from "react";
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";

import ConversionChart from "../Chart/GrowthChart/ConversionChart";
import CohortChart from "../Chart/GrowthChart/CohortChart";
import InviteMetricsChart from "../Chart/GrowthChart/InviteMetricsChart";
import StateUserChart from "../Chart/GrowthChart/StateUserChart";
import {
  useGetCohortRetentionDataQuery,
  useGetConversionFunnelDataQuery,
  useGetInviteMetricsDataQuery,
  useGetTopZipCodesDataQuery,
  useGetUsersByStateDataQuery,
} from "../../Redux/slices/growth&RetentionApi";

export function GrowthRetention() {
  const currentYear = new Date().getFullYear().toString();
  // Year filters for each chart
  const [funnelYear, setFunnelYear] = useState(currentYear);
  const [retentionYear, setRetentionYear] = useState(currentYear);
  const [inviteYear, setInviteYear] = useState(currentYear);
  const [geoYear, setGeoYear] = useState(currentYear);

  const { data: conversionFunnelData, isLoading: loadingConversionFunnelData } =
    useGetConversionFunnelDataQuery(funnelYear);
  const conversionFunnel = conversionFunnelData?.data;

  const { data: cohortRetentionData, isLoading: loadingCohortRetentionData } =
    useGetCohortRetentionDataQuery(retentionYear);
  const cohortRetention = cohortRetentionData?.data;

  const { data: inviteMetricsData, isLoading: loadingInviteMetricsData } =
    useGetInviteMetricsDataQuery(inviteYear);
  const inviteMetrics = inviteMetricsData?.data;

  const { data: usersByStateData, isLoading: loadingUsersByStateData } =
    useGetUsersByStateDataQuery(geoYear);
  const usersByState = usersByStateData?.data;

  const { data: topZipCodesData, isLoading: loadingTopZipCodesData } =
    useGetTopZipCodesDataQuery();
  const topZipCodes = topZipCodesData?.data;
  // console.log("topZipCodes", topZipCodes);

  const COLORS = [
    "#2563eb", // vibrant blue
    "#3b82f6", // bright blue
    "#06b6d4", // bright cyan
    "#14b8a6", // bright teal
    "#10b981", // bright green
    "#8b5cf6", // bright purple
  ];

  if (
    loadingConversionFunnelData ||
    loadingCohortRetentionData ||
    loadingInviteMetricsData ||
    loadingUsersByStateData ||
    loadingTopZipCodesData
  ) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      {/* Charts Row 1: Conversion Funnel & Cohort Retention */}
      <div
        className="grid gap-6 mb-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p className="text-lg font-semibold">Conversion Funnel</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={funnelYear}
                  onChange={(e) => setFunnelYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Signup to paid user journey
            </p>
            <ConversionChart funnelData={conversionFunnel} />
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold">Cohort Retention</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={retentionYear}
                  onChange={(e) => setRetentionYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Retention rates at day 7, 30, and 60 days
            </p>
            <CohortChart retentionData={cohortRetention} />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Invite Metrics & Geographic Distribution */}
      <div
        className="grid gap-6 mb-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold">Invite Metrics</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={inviteYear}
                  onChange={(e) => setInviteYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Invites sent and acceptance rates
            </p>
            <InviteMetricsChart inviteData={inviteMetrics} />
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold">Users by State</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={geoYear}
                  onChange={(e) => setGeoYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Geographic distribution of users
            </p>
            <StateUserChart geoData={usersByState} COLORS={COLORS} />
          </CardContent>
        </Card>
      </div>

      {/* Top Zip Codes Card */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <p className="text-lg font-semibold mb-1">Top Zip Codes</p>
          <p className="text-sm text-[#6b7280] mb-6">
            Highest user concentration areas
          </p>
          <div className="grid grid-cols-5 gap-5">
            {topZipCodes.map((item, index) => (
              <div
                key={item.zipCode}
                className="p-4 rounded-lg border border-[#e5e7eb]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt
                    style={{ color: COLORS[index], fontSize: "20px" }}
                  />
                  <p className="text-lg font-bold">{item.zipCode}</p>
                </div>
                <p className="text-sm text-[#6b7280] mb-1">{item.country}</p>
                <p className="text-lg font-semibold text-[#3b82f6]">
                  {item.userCount} users
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
