import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import validator from 'validator';
import "./SignUp.css";
// constants
import { CC_IITKGP_URL } from "../../constants/urls";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "../../constants/routes";
import { NEW_ENDPOINT, TOKEN_ENDPOINT } from "../../constants/endpoints";
// components
import Loader from "../../components/loader/Loader";
// material-ui
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


const Copyright = props => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <a color="inherit" href={CC_IITKGP_URL} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                Counselling Centre - IIT Kharagpur
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignUp = () => {
    const history = useHistory();
    // states
    const [errorMsg, setErrorMsg] = useState("");
    const [name, setName] = useState("");
    const [professionalAffiliation, setProfessionalAffiliation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [accessKey, setAccessKey] = useState("");
    const [loading, setLoading] = useState(false);
    // errors
    const [nameErr, setNameErr] = useState(false);
    const [professionalAffiliationErr, setProfessionalAffiliationErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [confirmedPasswordErr, setConfirmedPasswordErr] = useState(false);
    const [accessKeyErr, setAccessKeyErr] = useState(false);

    useEffect(() => {
        try {
            const { token } = JSON.parse(localStorage.getItem("cc_task"));
            axios.post(TOKEN_ENDPOINT, { token }).then(res => history.push(HOME_ROUTE)).catch(err => { });
        } catch (err) { }
    }, [history]);

    const handleSubmit = e => {
        e.preventDefault();

        // error checks
        setNameErr(!name);
        setProfessionalAffiliationErr(!professionalAffiliation);
        setEmailErr(!validator.isEmail(email));
        setPasswordErr(!password);
        setConfirmedPasswordErr(!confirmedPassword);
        setAccessKeyErr(!accessKey);

        if (password !== confirmedPassword) {
            setErrorMsg("Passwords did not match. Try again.");
            setPassword("");
            setConfirmedPassword("");
        }
        else if (name && professionalAffiliation && validator.isEmail(email) && password && confirmedPassword && accessKey) {
            setLoading(true);
            const signUpData = { name, professionalAffiliation, email, password, accessKey };

            axios.post(NEW_ENDPOINT, signUpData).then(res => {
                const token = res.data;
                const localData = JSON.parse(localStorage.getItem("cc_task")) || { dark: false };
                localStorage.setItem("cc_task", JSON.stringify({ ...localData, token }));
                setErrorMsg("");
                setLoading(false);
                history.push(HOME_ROUTE);
            }).catch(err => {
                setErrorMsg(err.response.data.errMsg);
                setLoading(false);
            });

            // reset
            e.target.reset();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {loading ? <Loader /> : null}
            <IconButton onClick={() => history.push(HOME_ROUTE)} style={{ position: "fixed", top: "10px", left: "10px", color: "white", backgroundColor: "teal", zIndex: "5" }}><HomeRoundedIcon style={{ fontSize: "30px" }} /></IconButton>
            <Grid container component="main" sx={{ height: '100vh' }} style={{ overflow: "hidden" }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ height: "100vh", overflowX: "hidden", overflowY: "auto" }}>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth variant="standard" label="Name" value={name} error={nameErr} helperText={nameErr ? "Please, enter your name." : ""} onChange={e => setName(e.target.value)} autoFocus />
                            <TextField margin="normal" required fullWidth variant="standard" label="Professional affiliation" value={professionalAffiliation} error={professionalAffiliationErr} helperText={professionalAffiliationErr ? "Please, enter your professional affiliation." : ""} onChange={e => setProfessionalAffiliation(e.target.value)} />
                            <TextField margin="normal" required fullWidth variant="standard" label="Email address" value={email} error={emailErr} helperText={emailErr ? "Please, enter your proper email address." : ""} onChange={e => setEmail(e.target.value)} />
                            <TextField margin="normal" required fullWidth variant="standard" label="Password" type="password" value={password} error={passwordErr} helperText={passwordErr ? "Please, enter your password." : ""} onChange={e => setPassword(e.target.value)} />
                            <TextField margin="normal" required fullWidth variant="standard" label="Confirm password" type="password" value={confirmedPassword} error={confirmedPasswordErr} helperText={confirmedPasswordErr ? "Please, enter your confirmed password." : ""} onChange={e => setConfirmedPassword(e.target.value)} />
                            <TextField margin="normal" required fullWidth variant="standard" label="Access key" type="password" value={accessKey} error={accessKeyErr} helperText={accessKeyErr ? "Please, enter the access key." : ""} onChange={e => setAccessKey(e.target.value)} />
                            {errorMsg ? <p className="signUp__errMsg">{errorMsg}</p> : null}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to={SIGN_IN_ROUTE} variant="body2" style={{ textDecoration: "none" }}>{"Have an account? Sign In"}</Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/1600x900/?help)',
                        help: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} />
            </Grid>
        </ThemeProvider>
    );
}

export default SignUp;