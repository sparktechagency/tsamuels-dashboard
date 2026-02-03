import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useSignInMutation } from "../Redux/slices/authApi";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useSignInMutation();

  const handleShowNewPassword = () => setShowPassword((prev) => !prev);

  const onFinish = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const values = {
      email: form.get("email"),
      password: form.get("password"),
    };

    // console.log("signIn Data", values);
    // navigate("/", { replace: true });
    try {
      const res = await login(values).unwrap();
      // console.log("log in response", res);
      sessionStorage.setItem("accessToken", res?.data?.accessToken);
      sessionStorage.setItem("refreshToken", res?.data?.refreshToken);

      if (res.success) {
        toast.success("Login Successfully!");
        navigate("/");
      } else {
        toast.error("Login Error.");
      }
    } catch (error) {
      console.error("Error user login:", error);
      if (error.data.message === "User doesn't exist!") {
        toast.error("User doesn't exist!");
      }
      if (error.data.message === "Password is incorrect!") {
        toast.error("Password is incorrect!");
      } else {
        toast.error("Login failed. Please try again.");
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
            <p className="text-3xl text-center font-semibold mb-7">
              Sign in to continue!
            </p>

            <form onSubmit={onFinish}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: <HiOutlineMailOpen className="mr-2" />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2B7FFF", // Change border color on focus
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2B7FFF", // Change label color on focus (optional)
                  },
                  height: "50px", // Set the height of the TextField
                  "& .MuiInputBase-root": {
                    height: "100%", // Ensure the input base fills the TextField height
                  },
                }}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: <HiOutlineMailOpen className="mr-2" />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2B7FFF", // Change border color on focus
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2B7FFF", // Change label color on focus (optional)
                  },
                  height: "50px", // Set the height of the TextField
                  "& .MuiInputBase-root": {
                    height: "100%", // Ensure the input base fills the TextField height
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={handleShowNewPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <IoIosEyeOff className="text-[#0c57ad]" />
                          ) : (
                            <IoMdEye className="text-[#1950c5]" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <div className="flex items-center justify-between mt-2">
                <div className="text-[#2B7FFF] font-semibold">
                  <FormControlLabel
                    control={<Checkbox name="rememberMe" color="primary" />}
                    label="Remember Me"
                  />
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      color: "#2B7FFF",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#2B7FFF",
                  padding: "8px",
                  fontWeight: "semibold",
                  borderRadius: "10px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default SignIn;
