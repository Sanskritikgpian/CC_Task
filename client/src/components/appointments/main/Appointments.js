import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Appointments.css";
// constants
import { BLOG_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../../constants/routes";
// components
import AppointmentCard from "../appointmentCard/AppointmentCard";
import SearchBox from "../../blog/searchBox/SearchBox";
// material-ui
import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
// contexts
import UserContext from "../../../contexts/User";

const Appointments = ({ appointments, setAppointments, dark, handleDarkMode }) => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [search, setSearch] = useState("");

    const handleSignOut = () => {
        localStorage.removeItem("cc_task");
        history.push(SIGN_IN_ROUTE);
    };

    return (
        <div className="appointments" style={dark ? { backgroundColor: "#192734" } : {}}>
            <div className="appointments__intro">
                <h1>Appointments</h1>
                <p>The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.</p>
                <div className="appointments__introButtons">
                    <Button onClick={() => window.scrollTo(0, window.innerHeight - 75)}>Go through appointments</Button>
                </div>
            </div>
            <div className="appointments__collection">
                <SearchBox setSearch={setSearch} />
                <p style={dark ? { color: "white", backgroundColor: "#15202B" } : {}}><PeopleAltRoundedIcon style={dark ? { color: "white" } : {}} />Appointments</p>
                {user ? appointments.filter(appointment => JSON.stringify(appointment).toLowerCase().includes(search.toLowerCase())).map((appointment, index) => <AppointmentCard key={index} appointment={appointment} dark={dark} />) : <p className="appointments__deniedAccess">You are not authorised to go through the appointments.</p>}
            </div>
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', right: 10, bottom: 10 }} icon={<SpeedDialIcon style={{ color: "white" }} />}>
                <SpeedDialAction key={"go to blog"} icon={<PostAddRoundedIcon />} tooltipTitle={"go to blog"} onClick={() => history.push(BLOG_ROUTE)} />
                {!user ? <SpeedDialAction key={"Sign in for counsellors"} icon={<VpnKeyRoundedIcon />} tooltipTitle={"Sign in for counsellors"} onClick={() => history.push(SIGN_IN_ROUTE)} /> : null}
                {!user ? <SpeedDialAction key={"Sign up for counsellors"} icon={<PersonAddRoundedIcon />} tooltipTitle={"Sign up for counsellors"} onClick={() => history.push(SIGN_UP_ROUTE)} /> : null}
                {user ? <SpeedDialAction key={"Sign out for counsellors"} icon={<ExitToAppRoundedIcon />} tooltipTitle={"Sign out for counsellors"} onClick={() => handleSignOut()} /> : null}
                <SpeedDialAction key={dark ? "Light mode" : "Dark mode"} icon={dark ? <Brightness4RoundedIcon /> : <DarkModeRoundedIcon />} tooltipTitle={dark ? "Light mode" : "Dark mode"} onClick={() => handleDarkMode()} />
            </SpeedDial>
        </div>
    );
};

export default Appointments;
