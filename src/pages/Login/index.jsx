import { useState } from "react";
import { Grid, Paper, Button, Typography, Link } from "@mui/material";
import axios from "axios";
import InputField from "../../components/login/input";
import Title from "../../components/login/title";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: 480,
    width: 400,
    margin: "20px auto",
  };

  const btnStyle = { margin: "8px 0" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error on new submission

    // Basic validation
    if (!phoneNumber || !password) {
      setError("Phone number and password are required.");
      setLoading(false);
      return;
    }

    try {
      // Send GET request to the mock API at port 3004
      const response = await axios.get("http://localhost:3004/users", {
        params: { phoneNumber, password },
      });

      // If users are found with the matching phone number and password
      if (response.data.length > 0) {
        console.log("Login successful", response.data);
        navigate("/home"); // Redirect to the home page after successful login
      } else {
        setError("Invalid phone number or password."); // Show error if no match found
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("There was an error processing your request."); // Handle error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Title />
          <InputField
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            password={password}
            setPassword={setPassword}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
            aria-label="login-button"
            disabled={loading}
          >
            {loading ? "Loading..." : "Masuk"}
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "16px" }}
        >
          <Link href="#" underline="hover" aria-label="forgot-password-link">
            Forgot password?
          </Link>
        </Typography>
        <Typography variant="body2" align="center" style={{ marginTop: "8px" }}>
          Dont have an account?{" "}
          <Link href="#" underline="hover" aria-label="sign-up-link">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
