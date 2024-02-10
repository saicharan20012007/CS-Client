import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import { useDispatch, useSelector } from "react-redux";
import { memberLogin } from "../redux/authentication/action";
import logingif from "../assets/login.gif";
import logo from "../assets/logo.png";
import { MuiOtpInput } from "mui-one-time-password-input";

export default function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((store) => store.AuthReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(memberLogin(otp)).then((res) => {
      if (res.type === "AUTH_SUCCESS") {
        console.log(res.type);
        if (location.pathname === "/login") {
          navigate("/");
        } else {
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath, { replace: true });
        }
      }
    });
  };

  const countrycodes = [
    {
      value: "+91",
      label: "IN +91",
    },
  ];

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobilenumbererror, setMobileNumberError] = useState(false);

  const handleChange = (event) => {
    setMobileNumberError(false);
    const newValue = event.target.value.replace(/[^0-9]/g, ""); // Only allow digits
    setMobileNumber(newValue.slice(0, 10)); // Limit to 10 characters
  };

  const [isTimerActive, setIsTimerActive] = useState(false); // Add this state

  const HandleSendOtp = () => {
    if (mobileNumber.length < 10) {
      setMobileNumberError(true);
    } else {
      setMobileNumberError(false);
      setIsTimerActive(true); // Start timer when valid number entered
    }
  };

  const [otp, setOtp] = useState("");

  const handleChangeOtp = (newValue) => {
    setOtp(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}>
      <Box
        sx={{
          width: "40%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "5rem 6rem 0rem 6rem",
          alignItems: "flex-start",
        }}>
        <Box
          sx={{
            width: "250px",
            height: "50px",
            marginTop: "2rem",
          }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "bold", mt: "4rem", mb: "2rem" }}>
          Welcome to Geometry
        </Typography>

        {isTimerActive ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography>
                {countrycodes[0].value}-{mobileNumber}
              </Typography>
              <Typography
                sx={{ color: "#1976D2", fontWeight: "bold", cursor: "pointer" }}
                onClick={() => setIsTimerActive(false)}>
                Change
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "left",
              }}>
              <Typography sx={{ fontSize: "0.9rem" }}>
                Enter OTP sent to your mobile number
              </Typography>
              <MuiOtpInput length={6} value={otp} onChange={handleChangeOtp} />
              {/* <Typography>Resend OTP : 0.{secondsRemaining}</Typography> */}
            </Box>
            <Button variant="contained" onClick={handleLogin}>
              Verify OTP
            </Button>
          </Box>
        ) : (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <TextField
                sx={{ width: "30%" }}
                size="small"
                id="outlined-select-currency"
                select
                value={countrycodes[0].value}
                required={true}
                defaultValue="EUR">
                {countrycodes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  required={true}
                />
                <Typography
                  sx={{
                    color: "red",
                    textAlign: "right",
                    display: mobilenumbererror ? "block" : "none",
                    fontSize: "13px",
                  }}>
                  Please enter valid mobile number!
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={HandleSendOtp}
              variant="contained"
              sx={{
                flex: " 1 1 auto",
              }}>
              Continue
            </Button>
            <Typography sx={{ textAlign: "left" }}>
              By signing up, I agree to the Powerplay{" "}
              <a href=""> Terms of Services </a> & acknowledge the{" "}
              <a href=""> Privacy Policy</a>.
            </Typography>
          </form>
        )}
      </Box>
      <Box sx={{ width: "70%", height: "100%" }}>
        <svg
          style={{ width: "100%", height: "100%", marginBottom: "0rem" }}
          xmlns="http://www.w3.org/2000/svg"
          width="755"
          height="477"
          viewBox="0 0 755 477"
          fill="none">
          <path
            d="M168.18 264.154H165.562V240.104V239.987L165.706 229.776L164.969 229.678L50.2467 195L2.35772 227.419L2.81979 228.109C1.26772 228.109 0 229.381 0 230.938V247.463C0 249.02 1.26772 250.292 2.81979 250.292H26.8235C28.3756 250.292 29.6433 249.02 29.6433 247.463V240.853H45.6498V545H64.476V240.865H141.925L163.512 264.165H159.081C157.529 264.165 156.261 265.437 156.261 266.995V269.824C156.261 271.382 157.529 272.654 159.081 272.654H168.18C169.732 272.654 171 271.382 171 269.824V266.995C171 265.437 169.732 264.154 168.18 264.154ZM50.5192 196.807L163.764 230.462H29.5959C29.3708 229.131 28.2097 228.097 26.8117 228.097H4.28892L50.5192 196.807ZM155.385 240.865H163.915V262.168L144.176 240.865H155.385Z"
            fill="#B3D2FF"
          />
          <path d="M480.851 180H368V531.18H480.851V180Z" fill="#D2E4FF" />
          <path
            opacity="0.5"
            d="M449.691 228.451H368V279.905H449.691V228.451Z"
            fill="#AED3FF"
          />
          <path
            opacity="0.5"
            d="M449.691 322.67H368V374.124H449.691V322.67Z"
            fill="#AED3FF"
          />
          <path
            opacity="0.5"
            d="M449.691 415.658H368V467.112H449.691V415.658Z"
            fill="#AED3FF"
          />
          <path
            d="M621.539 466.779H606.315V419.202H480.85V180H449.678V531.376H480.85V531.179H606.315H621.539V466.779Z"
            fill="#AED3FF"
          />
          <path
            d="M540.106 100.371H543.919V65.4649V65.2957L543.709 50.4752L544.781 50.3324L711.834 0L781.567 47.054L780.894 48.0548C783.154 48.0548 785 49.901 785 52.1614V76.1457C785 78.406 783.154 80.2523 780.894 80.2523H745.941C743.681 80.2523 741.835 78.406 741.835 76.1457V66.552H718.528V508H691.114V66.5692H578.337L546.903 100.389H553.356C555.616 100.389 557.462 102.235 557.462 104.495V108.602C557.462 110.862 555.616 112.709 553.356 112.709H540.106C537.846 112.709 536 110.862 536 108.602V104.495C536 102.235 537.846 100.371 540.106 100.371ZM711.437 2.62274L546.536 51.4712H741.904C742.232 49.5387 743.923 48.0375 745.958 48.0375H778.755L711.437 2.62274ZM558.738 66.5692H546.317V97.4899L575.059 66.5692H558.738Z"
            fill="#B3D2FF"
          />
          <path
            d="M241.288 311.411V309.516H237.14V297H233.707V309.516H225.006V297H221.573V309.516H212.121V297H208.688V309.516H199.987V297H196.553V309.516H192V311.411H196.553V317.503H192V319.398H196.553V325.49H192V327.385H196.553V333.477H192V335.372H196.553V341.464H192V343.359H196.553V349.45H192V351.346H196.553V356.268H192V358.163H196.553V364.255H192V366.15H196.553V372.242H192V374.137H196.553V380.229H192V382.124H196.553V388.216H192V390.111H196.553V396.203H192V398.098H196.553V403.907H192V405.802H196.553V411.894H192V413.789H196.553V419.881H192V421.776H196.553V427.868H192V429.763H196.553V435.855H192V437.75H196.553V443.842H192V445.737H196.553V450.659H192V452.555H196.553V458.646H192V460.542H196.553V466.633H192V468.529H196.553V474.62H192V476.515H196.553V482.607H192V484.502H196.553V490.594H192V492.489H196.553V497.929H192V499.824H196.553V505.916H192V507.811H196.553V513.903H192V515.798H196.553V521.89H192V523.785H196.553V529.877H192V531.772H196.553V537.864H192V539.759H196.553V544.681H192V546.577H196.553V552.668H192V554.564H196.553V560.655H192V562.55H241.288V560.655H237.14V554.564H241.288V552.668H237.14V546.577H241.288V544.681H237.14V539.759H241.288V537.864H237.14V531.772H241.288V529.877H237.14V523.785H241.288V521.89H237.14V515.798H241.288V513.903H237.14V507.811H241.288V505.916H237.14V499.824H241.288V497.929H237.14V492.489H241.288V490.594H237.14V484.502H241.288V482.607H237.14V476.515H241.288V474.62H237.14V468.529H241.288V466.633H237.14V460.542H241.288V458.646H237.14V452.555H241.288V450.659H237.14V445.737H241.288V443.842H237.14V437.75H241.288V435.855H237.14V429.763H241.288V427.868H237.14V421.776H241.288V419.881H237.14V413.789H241.288V411.894H237.14V405.802H241.288V403.907H237.14V398.098H241.288V396.203H237.14V390.111H241.288V388.216H237.14V382.124H241.288V380.229H237.14V374.137H241.288V372.242H237.14V366.15H241.288V364.255H237.14V358.163H241.288V356.268H237.14V351.346H241.288V349.45H237.14V343.359H241.288V341.464H237.14V335.372H241.288V333.477H237.14V327.385H241.288V325.49H237.14V319.398H241.288V317.503H237.14V311.411H241.288ZM221.573 311.411V317.503H212.121V311.411H221.573ZM212.121 552.668V546.577H221.573V552.668H212.121ZM221.573 554.564V560.655H212.121V554.564H221.573ZM212.121 544.681V539.759H221.573V544.681H212.121ZM212.121 537.851V531.76H221.573V537.851H212.121ZM212.121 529.877V523.785H221.573V529.877H212.121ZM212.121 521.89V515.798H221.573V521.89H212.121ZM212.121 513.903V507.811H221.573V513.903H212.121ZM212.121 505.916V499.824H221.573V505.916H212.121ZM212.121 497.929V492.489H221.573V497.929H212.121ZM212.121 490.594V484.502H221.573V490.594H212.121ZM212.121 482.607V476.515H221.573V482.607H212.121ZM212.121 474.62V468.529H221.573V474.62H212.121ZM212.121 466.633V460.542H221.573V466.633H212.121ZM212.121 458.646V452.555H221.573V458.646H212.121ZM212.121 450.659V445.737H221.573V450.659H212.121ZM212.121 443.842V437.75H221.573V443.842H212.121ZM212.121 435.855V429.763H221.573V435.855H212.121ZM212.121 427.868V421.776H221.573V427.868H212.121ZM212.121 419.881V413.789H221.573V419.881H212.121ZM212.121 411.894V405.802H221.573V411.894H212.121ZM212.121 403.907V398.098H221.573V403.907H212.121ZM212.121 396.203V390.111H221.573V396.203H212.121ZM212.121 388.216V382.124H221.573V388.216H212.121ZM212.121 380.229V374.137H221.573V380.229H212.121ZM212.121 372.242V366.15H221.573V372.242H212.121ZM212.121 364.255V358.163H221.573V364.255H212.121ZM212.121 356.268V351.346H221.573V356.268H212.121ZM212.121 349.45V343.359H221.573V349.45H212.121ZM212.121 341.464V335.372H221.573V341.464H212.121ZM212.121 333.477V327.385H221.573V333.477H212.121ZM212.121 325.49V319.398H221.573V325.49H212.121ZM199.987 311.411H208.688V317.503H199.987V311.411ZM199.987 319.398H208.688V325.49H199.987V319.398ZM199.987 327.385H208.688V333.477H199.987V327.385ZM199.987 335.372H208.688V341.464H199.987V335.372ZM199.987 343.359H208.688V349.45H199.987V343.359ZM199.987 351.346H208.688V356.268H199.987V351.346ZM199.987 358.163H208.688V364.255H199.987V358.163ZM199.987 366.15H208.688V372.242H199.987V366.15ZM199.987 374.137H208.688V380.229H199.987V374.137ZM199.987 382.124H208.688V388.216H199.987V382.124ZM199.987 390.111H208.688V396.203H199.987V390.111ZM199.987 398.098H208.688V403.907H199.987V398.098ZM199.987 405.802H208.688V411.894H199.987V405.802ZM199.987 413.789H208.688V419.881H199.987V413.789ZM199.987 421.776H208.688V427.868H199.987V421.776ZM199.987 429.763H208.688V435.855H199.987V429.763ZM199.987 437.75H208.688V443.842H199.987V437.75ZM199.987 445.737H208.688V450.659H199.987V445.737ZM199.987 452.555H208.688V458.646H199.987V452.555ZM199.987 460.542H208.688V466.633H199.987V460.542ZM199.987 468.529H208.688V474.62H199.987V468.529ZM199.987 476.515H208.688V482.607H199.987V476.515ZM199.987 484.502H208.688V490.594H199.987V484.502ZM199.987 492.489H208.688V497.929H199.987V492.489ZM199.987 499.824H208.688V505.916H199.987V499.824ZM199.987 507.811H208.688V513.903H199.987V507.811ZM199.987 515.798H208.688V521.89H199.987V515.798ZM199.987 523.785H208.688V529.877H199.987V523.785ZM199.987 531.772H208.688V537.864H199.987V531.772ZM199.987 539.746H208.688V544.669H199.987V539.746ZM199.987 546.577H208.688V552.668H199.987V546.577ZM199.987 554.564H208.688V560.655H199.987V554.564ZM233.707 560.655H225.006V554.564H233.707V560.655ZM233.707 552.668H225.006V546.577H233.707V552.668ZM233.707 544.681H225.006V539.759H233.707V544.681ZM233.707 537.851H225.006V531.76H233.707V537.851ZM233.707 529.877H225.006V523.785H233.707V529.877ZM233.707 521.89H225.006V515.798H233.707V521.89ZM233.707 513.903H225.006V507.811H233.707V513.903ZM233.707 505.916H225.006V499.824H233.707V505.916ZM233.707 497.929H225.006V492.489H233.707V497.929ZM233.707 490.594H225.006V484.502H233.707V490.594ZM233.707 482.607H225.006V476.515H233.707V482.607ZM233.707 474.62H225.006V468.529H233.707V474.62ZM233.707 466.633H225.006V460.542H233.707V466.633ZM233.707 458.646H225.006V452.555H233.707V458.646ZM233.707 450.659H225.006V445.737H233.707V450.659ZM233.707 443.842H225.006V437.75H233.707V443.842ZM233.707 435.855H225.006V429.763H233.707V435.855ZM233.707 427.868H225.006V421.776H233.707V427.868ZM233.707 419.881H225.006V413.789H233.707V419.881ZM233.707 411.894H225.006V405.802H233.707V411.894ZM233.707 403.907H225.006V398.098H233.707V403.907ZM233.707 396.203H225.006V390.111H233.707V396.203ZM233.707 388.216H225.006V382.124H233.707V388.216ZM233.707 380.229H225.006V374.137H233.707V380.229ZM233.707 372.242H225.006V366.15H233.707V372.242ZM233.707 364.255H225.006V358.163H233.707V364.255ZM233.707 356.268H225.006V351.346H233.707V356.268ZM233.707 349.45H225.006V343.359H233.707V349.45ZM233.707 341.464H225.006V335.372H233.707V341.464ZM233.707 333.477H225.006V327.385H233.707V333.477ZM233.707 325.49H225.006V319.398H233.707V325.49ZM233.707 317.503H225.006V311.411H233.707V317.503Z"
            fill="#D2E4FF"
          />
          <path
            opacity="0.2"
            d="M599.778 594.022C599.778 594.022 673.064 592.665 704.384 558.086C761.115 495.441 735.545 440.515 634.536 444.596C521.534 449.171 535.475 254.994 339.824 348.482C297.336 368.78 202.79 326.149 165.006 414.975C156.024 436.1 88.5678 437.567 44.9544 454.511C-23.4362 481.086 -4.12462 594.465 60.4797 594.909C125.1 595.353 599.778 594.022 599.778 594.022Z"
            fill="#B3D2FF"
          />
        </svg>
      </Box>
    </Box>
  );
}
