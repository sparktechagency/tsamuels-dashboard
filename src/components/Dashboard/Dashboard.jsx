import {
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import {
  FaUsers,
  FaUserPlus,
  FaCalendar,
  FaClock,
  FaUserFriends,
  FaChartBar,
  FaBolt,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";
import { MetricCard } from "../UI/MetricCard";
import {
  allCalendarDensityData,
  allFeatureUsageData,
  allOnboardingData,
  allUserTypeData,
} from "../../../public/data/overviewData";
import GrowthVsLoyaltyChart from "../Chart/OverviewChart/GrowthVsLoyaltyChart";
import FeatureUsageChart from "../Chart/OverviewChart/FeatureUsageChart";
import OnboardingChart from "../Chart/OverviewChart/OnboardingChart";
import CalendarAndFamilyChart from "../Chart/OverviewChart/Calendar&FamilyChart";
import { useGetEngagementMetricsQuery } from "../../Redux/slices/dashboardApi";

export default function Dashboard() {
  const currentYear = new Date().getFullYear().toString();
  // console.log(currentYear);

  const { data: engagementMetricsData, isLoading } =
    useGetEngagementMetricsQuery();
  const engagementMetrics = engagementMetricsData?.data;
  // console.log("engagement metrics", engagementMetrics);

  // Individual year filters for each chart
  const [userTypeYear, setUserTypeYear] = useState(currentYear);
  const [featureUsageYear, setFeatureUsageYear] = useState(currentYear);
  const [onboardingYear, setOnboardingYear] = useState(currentYear);
  // const [sessionYear, setSessionYear] = useState("2025");
  const [calendarDensityYear, setCalendarDensityYear] = useState(currentYear);
  // const [timeToValueYear, setTimeToValueYear] = useState("2025");

  const userTypeData = allUserTypeData[userTypeYear];
  const featureUsageData = allFeatureUsageData[featureUsageYear];
  const onboardingData = allOnboardingData[onboardingYear];
  // const sessionData = allSessionData[sessionYear];
  const calendarDensityData = allCalendarDensityData[calendarDensityYear];
  // const timeToValueData = allTimeToValueData[timeToValueYear];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Top Row Metrics - Core Usage */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <MetricCard
          title="Daily Active Users"
          value={engagementMetrics?.dau?.count ?? "N/A"}
          growth={engagementMetrics?.dau?.growth ?? 0}
          icon={FaUsers}
          subtitle={engagementMetrics?.dau ? "DAU" : "N/A"}
        />
        <MetricCard
          title="Weekly Active Users"
          value={engagementMetrics?.wau?.count ?? "N/A"}
          growth={engagementMetrics?.wau?.growth ?? 0}
          icon={FaChartLine}
          subtitle={engagementMetrics?.wau ? "WAU" : "N/A"}
        />

        <MetricCard
          title="Monthly Active Users"
          value={engagementMetrics?.mau?.count ?? "N/A"}
          growth={engagementMetrics?.mau?.growth ?? 0}
          icon={FaChartBar}
          subtitle={engagementMetrics?.mau ? "MAU" : "N/A"}
        />

        <MetricCard
          title="Stickiness"
          value={engagementMetrics?.stickiness?.ratio ?? "N/A"}
          growth={engagementMetrics?.stickiness?.growth ?? 0}
          icon={FaBolt}
          subtitle={engagementMetrics?.stickiness ? "DAU/MAU Ratio" : "N/A"}
        />

        <MetricCard
          title="Active Families"
          value={engagementMetrics?.activeFamilies?.count ?? "N/A"}
          growth={engagementMetrics?.activeFamilies?.growth ?? 0}
          icon={FaUserFriends}
          subtitle={
            engagementMetrics?.activeFamilies
              ? `Of ${engagementMetrics.activeFamilies.total} total`
              : "N/A"
          }
        />

        <MetricCard
          title="Members/Family"
          value={engagementMetrics?.membersPerFamily?.average ?? "N/A"}
          growth={engagementMetrics?.membersPerFamily?.growth ?? 0}
          icon={FaUsers}
          subtitle={
            engagementMetrics?.membersPerFamily ? "Average family size" : "N/A"
          }
        />
      </div>

      {/* Charts Row 1: New vs Returning Users & Feature Usage */}
      <div className="grid gap-6 mb-6 [grid-template-columns:repeat(auto-fit,minmax(500px,1fr))]">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-1">
            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
              New vs Returning Users
            </p>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select
                value={userTypeYear}
                onChange={(e) => setUserTypeYear(e.target.value)}
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
            Growth vs loyalty trends
          </p>
          <GrowthVsLoyaltyChart userTypeData={userTypeData} />
        </div>

        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-1">
            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
              Feature Usage Rates
            </p>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select
                value={featureUsageYear}
                onChange={(e) => setFeatureUsageYear(e.target.value)}
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
            Active users and session counts by feature
          </p>
          <FeatureUsageChart featureUsageData={featureUsageData} />
        </div>
      </div>

      {/* Charts Row 2: Onboarding Funnel & Session Metrics */}
      <div className="grid gap-6 mb-6 [grid-template-columns:repeat(auto-fit,minmax(500px,1fr))]">
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-1">
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Onboarding Completion
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={onboardingYear}
                  onChange={(e) => setOnboardingYear(e.target.value)}
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
              User progression and drop-off points
            </p>
            <OnboardingChart onboardingData={onboardingData} />
          </div>
        </Card>

        {/* <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Session Metrics
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={sessionYear}
                  onChange={(e) => setSessionYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-4">
              Track session duration and frequency to measure user engagement
            </p>
            <SessionChart sessionData={sessionData} />
          </div>
        </Card> */}
      </div>

      {/* Charts Row 3: Calendar Density & Time to Value */}
      <div className="flex gap-6">
        <Card
          elevation={2}
          sx={{
            flex: 1,
            borderRadius: 4,
          }}
        >
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Calendar Density & Family Growth
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={calendarDensityYear}
                  onChange={(e) => setCalendarDensityYear(e.target.value)}
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
              Events per family and average members
            </p>
            <CalendarAndFamilyChart calendarDensityData={calendarDensityData} />
          </div>
        </Card>

        {/* <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            height: "100%",
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Time to Value
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={timeToValueYear}
                  onChange={(e) => setTimeToValueYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Median days from signup
            </p>
            <div className="flex flex-col gap-4 mt-2">
              {timeToValueData.map((item, index) => (
                <div key={item.metric}>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-semibold">{item.metric}</p>
                    <p className="text-sm text-[#3b82f6] font-bold">
                      {item.days} days
                    </p>
                  </div>
                  <div className="h-2 rounded-sm bg-[#e5e7eb] overflow-hidden">
                    <div
                      style={{
                        height: "100%",
                        width: `${((7 - item.days) / 7) * 100}%`,
                        background: `linear-gradient(90deg, ${
                          COLORS[index]
                        } 0%, ${COLORS[index + 1] || COLORS[index]} 100%)`,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-lg border border-[#3B82F633] bg-[#3b82f619]">
              <p className="text-sm text-[#1e40af] font-semibold">
                💡 Lower is better - faster time to value means users see the
                benefit sooner
              </p>
            </div>
          </div>
        </Card> */}
      </div>
    </div>
  );
}
