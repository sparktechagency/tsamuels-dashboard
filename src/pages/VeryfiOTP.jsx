import { useEffect, useState } from "react";
import { Button, Grid, Typography, Container } from "@mui/material";
import OTPInput from "react-otp-input";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../Redux/slices/authApi";
import { toast } from "sonner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const calculateTimer = () => {
      const sentTime = sessionStorage.getItem("otpSentTime");
      if (sentTime) {
        const elapsed = Math.floor((Date.now() - parseInt(sentTime)) / 1000);
        const remaining = 180 - elapsed;
        if (remaining > 0) {
          setTimer(remaining);
          setCanResend(false);
        } else {
          setTimer(0);
          setCanResend(true);
        }
      } else {
        // Fallback or fresh start if no timestamp found
        sessionStorage.setItem("otpSentTime", Date.now().toString());
        setTimer(180);
        setCanResend(false);
      }
    };

    calculateTimer();

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendOtp = async () => {
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }

    try {
      const response = await resendOtp({ email }).unwrap();
      if (response.success) {
        toast.success("OTP Resent Successfully!");
        setTimer(180);
        setCanResend(false);
        sessionStorage.setItem("otpSentTime", Date.now().toString());
        // Optionally update sessionStorage with new token if needed,
        // though usually verify checks against the latest one sent to email/db.
        if (response?.data?.verifyToken) {
          sessionStorage.setItem("otpToken", response.data.verifyToken);
        }
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length < 4) {
      toast.error("Please fill in all OTP fields");
      return;
    }
    const userEmail = sessionStorage.getItem("userEmail");
    if (!userEmail) {
      toast.warning("Error! Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }
    // const token = sessionStorage.getItem("otpToken");
    // if (!token) {
    //   toast.error("Error! Please start the reset process again.");
    //   navigate("/forgot-password");
    //   return;
    // }
    try {
      const data = { oneTimeCode: Number(otp), email: userEmail };
      const response = await verifyOtp(data).unwrap();
      console.log("response", response);
      if (response.success === true) {
        sessionStorage.setItem("verifyToken", response?.data?.verifyToken);
        toast.success("OTP verified successfully!");
        navigate("/update-password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.data?.message === "Invalid OTP") {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#a9e9f3] min-h-[100vh]">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <div className="bg-[#fff] rounded-lg p-5 border border-[#875473]">
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-4">
                <Link to="/forgot-password" className="cursor-pointer">
                  <HiArrowLeft style={{ fontSize: "24px" }} />
                </Link>
                <Typography variant="h5" style={{ fontWeight: 500 }}>
                  Enter verification code
                </Typography>
              </div>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ marginBottom: "20px" }}
              >
                Please enter the OTP sent to your email address
              </Typography>
            </div>

            <div className="flex items-center justify-center">
              <OTPInput
                inputStyle={{
                  width: "55px",
                  height: "45px",
                  fontSize: "20px",
                  backgroundColor: "transparent",
                  border: "1px solid #2B7FFF",
                  borderRadius: "8px",
                  margin: "5px",
                  textAlign: "center",
                }}
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) => <input {...props} required />}
              />
            </div>

            <Button
              fullWidth
              variant="contained"
              style={{
                marginTop: "20px",
                backgroundColor: "#2B7FFF",
                padding: "8px",
                fontWeight: "bold",
                borderRadius: "10px",
                fontSize: "16px",
                textTransform: "none",
              }}
              onClick={handleOTPSubmit}
            >
              Verify
            </Button>

            <div className="flex justify-center mt-4">
              <Button
                disabled={!canResend}
                onClick={handleResendOtp}
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: canResend ? "#2B7FFF" : "#A0A0A0",
                }}
              >
                {canResend
                  ? "Resend OTP"
                  : `Resend OTP in ${Math.floor(timer / 60)
                      .toString()
                      .padStart(2, "0")}:${(timer % 60)
                      .toString()
                      .padStart(2, "0")}`}
              </Button>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default VerifyOtp;
