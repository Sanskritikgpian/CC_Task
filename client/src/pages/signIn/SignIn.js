import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import validator from 'validator';
import "./SignIn.css";
// constants
import { CC_IITKGP_URL } from "../../constants/urls";
import { HOME_ROUTE, SIGN_UP_ROUTE } from "../../constants/routes";
import { AUTH_ENDPOINT, TOKEN_ENDPOINT } from "../../constants/endpoints";
// components
import Loader from "../../components/loader/Loader";
// material-ui
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, IconButton, Typography } from '@mui/material';
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

const SignIn = () => {
    const history = useHistory();
    // states
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // errors
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            const { token } = JSON.parse(localStorage.getItem("cc_task"));
            axios.post(TOKEN_ENDPOINT, { token }).then(res => {
                setLoading(false);
                history.push(HOME_ROUTE);
            }).catch(err => { setLoading(false); });
        } catch (err) { setLoading(false); }
    }, [history]);

    const handleSubmit = e => {
        e.preventDefault();

        // error checks
        setEmailErr(!validator.isEmail(email));
        setPasswordErr(!password);

        if (validator.isEmail(email) && password) {
            setLoading(true);
            const signInData = { email, password };

            axios.post(AUTH_ENDPOINT, signInData).then(res => {
                const token = res.data;
                const localData = JSON.parse(localStorage.getItem("cc_task")) || { dark: false };
                localStorage.setItem("cc_task", JSON.stringify({ ...localData, token }));
                setLoading(false);
                history.push(HOME_ROUTE);
            }).catch(err => { setErrorMsg(err.response.data.errMsg); setLoading(false); });

            // reset
            e.target.reset();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {loading ? <Loader /> : null}
            <IconButton onClick={() => history.push(HOME_ROUTE)} style={{ position: "fixed", top: "10px", right: "10px", color: "white", backgroundColor: "teal", zIndex: "5" }}><HomeRoundedIcon style={{ fontSize: "30px" }} /></IconButton>
            <Grid container component="main" sx={{ height: '100vh' }} style={{ overflow: "hidden" }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/1600x900/?counselling)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ height: "100vh", overflowX: "hidden", overflowY: "auto" }}>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="email" variant="standard" label="Email address" value={email} error={emailErr} helperText={emailErr ? "Please, enter your proper email address." : ""} onChange={e => setEmail(e.target.value)} autoFocus />
                            <TextField margin="normal" required fullWidth variant="standard" label="Password" type="password" id="password" value={password} error={passwordErr} helperText={passwordErr ? "Please, enter your password." : ""} onChange={e => setPassword(e.target.value)} />
                            {errorMsg ? <p className="signIn__errMsg">{errorMsg}</p> : null}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to={SIGN_UP_ROUTE} variant="body2" style={{ textDecoration: "none" }}>{"Don't have an account? Sign Up"}</Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignIn;