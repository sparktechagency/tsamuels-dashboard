import {
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
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
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { useState } from "react";
import { MetricCard } from "../UI/MetricCard";
import {
  allCalendarDensityData,
  allFeatureUsageData,
  allOnboardingData,
  allSessionData,
  allTimeToValueData,
  allUserTypeData,
} from "../../../public/data/overviewData";

export default function Dashboard() {
  // Individual year filters for each chart
  const [userTypeYear, setUserTypeYear] = useState("2025");
  const [featureUsageYear, setFeatureUsageYear] = useState("2025");
  const [onboardingYear, setOnboardingYear] = useState("2025");
  const [sessionYear, setSessionYear] = useState("2025");
  const [calendarDensityYear, setCalendarDensityYear] = useState("2025");
  const [timeToValueYear, setTimeToValueYear] = useState("2025");

  const userTypeData = allUserTypeData[userTypeYear];
  const featureUsageData = allFeatureUsageData[featureUsageYear];
  const onboardingData = allOnboardingData[onboardingYear];
  const sessionData = allSessionData[sessionYear];
  const calendarDensityData = allCalendarDensityData[calendarDensityYear];
  const timeToValueData = allTimeToValueData[timeToValueYear];

  const COLORS = [
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#dbeafe",
    "#eff6ff",
    "#bfdbfe",
  ];

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
          title="DAU"
          value="12,458"
          change={5.2}
          icon={FaUsers}
          subtitle="Daily Active Users"
        />
        <MetricCard
          title="WAU"
          value="32,145"
          change={8.7}
          icon={FaChartLine}
          subtitle="Weekly Active Users"
        />
        <MetricCard
          title="MAU"
          value="48,392"
          change={12.3}
          icon={FaChartBar}
          subtitle="Monthly Active Users"
        />
        <MetricCard
          title="Stickiness"
          value="25.7%"
          change={3.1}
          icon={FaBolt}
          subtitle="DAU/MAU Ratio"
        />
        <MetricCard
          title="Avg Sessions/Week"
          value="3.1"
          change={6.8}
          icon={FaChartBar}
          subtitle="Per User"
        />
      </div>

      {/* Second Row Metrics - Family & User Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <MetricCard
          title="Active Families"
          value="8,942"
          change={7.4}
          icon={FaUserFriends}
          subtitle="Of 11,235 total"
        />
        <MetricCard
          title="Members/Family"
          value="4.3"
          change={4.2}
          icon={FaUsers}
          subtitle="Average family size"
        />
        <MetricCard
          title="Avg Session Length"
          value="10.8 min"
          change={9.1}
          icon={FaClock}
          subtitle="Per session"
        />
        <MetricCard
          title="Events/Family"
          value="31.2"
          change={11.5}
          icon={FaCalendar}
          subtitle="Monthly average"
        />
      </div>

      {/* Charts Row 1: New vs Returning Users & Feature Usage */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
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
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Growth vs loyalty trends
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="new"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="New Users"
                />
                <Area
                  type="monotone"
                  dataKey="returning"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  name="Returning Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
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
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Active users and session counts by feature
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={featureUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis
                  dataKey="feature"
                  type="category"
                  width={120}
                  stroke="#6b7280"
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="usageRate" fill="#3b82f6" name="Usage Rate %" />
                <Line
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Active Users"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Onboarding Funnel & Session Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
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
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              User progression and drop-off points
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={onboardingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="step"
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="users" fill="#3b82f6" name="Users" />
                <Bar dataKey="percent" fill="#10b981" name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
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
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Session Metrics by Day
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Session length (min) and sessions per user
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="avgLength"
                  fill="#3b82f6"
                  name="Avg Length (min)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sessionsPerUser"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Sessions/User"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3: Calendar Density & Time to Value */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
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
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Events per family and average members
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={calendarDensityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="eventsPerFamily"
                  fill="#3b82f6"
                  name="Events per Family"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgMembers"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Avg Members"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            height: "100%",
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Median days from signup
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "32px",
              }}
            >
              {timeToValueData.map((item, index) => (
                <div key={item.metric}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.metric}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "#3b82f6",
                        fontWeight: 700,
                      }}
                    >
                      {item.days} days
                    </p>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      borderRadius: "4px",
                      background: "#e5e7eb",
                      overflow: "hidden",
                    }}
                  >
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
            <div
              style={{
                marginTop: "32px",
                padding: "16px",
                borderRadius: "8px",
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: "#1e40af",
                  fontWeight: 600,
                }}
              >
                💡 Lower is better - faster time to value means users see the
                benefit sooner
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
