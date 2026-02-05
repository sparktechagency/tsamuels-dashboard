import { useState } from "react";
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";

import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import PushNotificationChart from "../Chart/NotificationChart/PushNotificationChart";
import {
  useGetDailyDigestDataQuery,
  useGetOptInRateDataQuery,
  useGetPushNotificationDataQuery,
} from "../../Redux/slices/notificationsApi";
import { NoDataFallback } from "../utils/noDataFallBack";
import DailyDigestChart from "../Chart/NotificationChart/DailyDigestChart";
import OptInRatesChart from "../Chart/NotificationChart/OptInRatesChart";

export default function Notifications() {
  const currentYear = new Date().getFullYear().toString();

  // Year filters for each chart
  const [deliverabilityYear, setDeliverabilityYear] = useState(currentYear);
  const [digestYear, setDigestYear] = useState(currentYear);
  const [optInYear, setOptInYear] = useState(currentYear);

  const {
    data: pushNotificationsData,
    isLoading: loadingPushNotificationsData,
  } = useGetPushNotificationDataQuery(deliverabilityYear);
  const pushNotifications = pushNotificationsData?.data;

  const { data: dailyDigestData, isLoading: loadingDailyDigestData } =
    useGetDailyDigestDataQuery(digestYear);
  const dailyDigest = dailyDigestData?.data;

  const { data: optInRatesData, isLoading: loadingOptInRatesData } =
    useGetOptInRateDataQuery(optInYear);
  const optInRates = optInRatesData?.data;

  return (
    <div style={{ padding: "32px" }}>
      {/* Charts Row 1: Deliverability Funnel & Daily Digest Success */}
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
                Push Notification Deliverability
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={deliverabilityYear}
                  onChange={(e) => setDeliverabilityYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Sent → Delivered → Opened → Clicked
            </p>
            {loadingPushNotificationsData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : pushNotifications && pushNotifications.length > 0 ? (
              <PushNotificationChart pushNotifications={pushNotifications} />
            ) : (
              <NoDataFallback />
            )}
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
                Daily Digest Success by Channel
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={digestYear}
                  onChange={(e) => setDigestYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Twilio, Apple Push, Firebase delivery rates
            </p>
            {loadingDailyDigestData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : dailyDigest && dailyDigest.length > 0 ? (
              <DailyDigestChart dailyDigest={dailyDigest} />
            ) : (
              <NoDataFallback />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Opt-in Rates by Platform & Country */}
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
                Opt-in Rates by Country
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={optInYear}
                  onChange={(e) => setOptInYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Geographic permission patterns
            </p>
            {loadingOptInRatesData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : optInRates && optInRates.length > 0 ? (
              <OptInRatesChart optInRates={optInRates} />
            ) : (
              <NoDataFallback />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
