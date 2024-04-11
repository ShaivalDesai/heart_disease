import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio } from "@mui/material";
import { FormControl, FormLabel } from "react-bootstrap";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

interface FormData {
  email: string;
  password: string;
  user_type: string;
}

export default function LoginUser() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user_type, setUser_type] = React.useState<string>("");
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowRegisterForm(true); // Show the registration form when the link is clicked
  };

  const HandleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    const validationErrors: Partial<{
      email: string;
      password: string;
      user_type: string;
    }> = {};

    if (!email.trim()) validationErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      validationErrors.email = "Email is invalid";

    if (!password.trim()) validationErrors.password = "Password is required";
    if (!user_type.trim())
      validationErrors.user_type = "User Type selection is required";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/login", {
          email,
          password,
          user_type,
        });
        if (response.status === 200) {
          toast.success("Login successful");
          // Navigate based on user_type
          if (user_type === "Customer") {
            sessionStorage.setItem("u_id", response.data.user_id);
            sessionStorage.setItem("c_id", response.data.customer_id);
            navigate("/home");
          } else if (user_type === "Vendor") {
            sessionStorage.setItem("u_id", response.data.user_id);
            sessionStorage.setItem("v_id", response.data.vendor_id);
            navigate("/dashboard");
          }
        }
      } catch (error) {
        toast.error("Login failed: Incorrect credentials or server error");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Grid
        container
        component="main"
        sx={{
            height: "100vh",
            // justifyContent: "flex-end", // Align to the right
            // alignItems: "center",
          }}    
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url("/11.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />  

        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square  sx={{background:"white",}}>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#ff595a",
                height: 65,
                width: 65,
                marginTop: "30px",
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: "#ff595a" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.email && <span>{errors.email}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                InputLabelProps={{
                  style: { color: "#ff595a" },
                }}
              />
              <div style={{ color: "red", marginBottom: 14 }}>
                {errors.password && <span>{errors.password}</span>}
              </div>

              <div style={{ color: "red" }}>
                {errors.user_type && <span>{errors.user_type}</span>}
              </div>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#ff595a",
                  "&:hover": {
                    bgcolor: "red",
                  },
                }}
                onClick={HandleLogin}
              >
                Login
              </Button>
              <Grid
                container
                justifyContent="space-between"
                spacing={2}
                sx={{ marginTop: "-25px" }}
              >
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="RegisterUser"
                    variant="body2"
                    onClick={handleRegisterClick}
                  >
                    Don't have an account?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
