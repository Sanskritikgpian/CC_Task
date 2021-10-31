import React from "react";
import "./AppointmentCard.css";
// mmaterial-ui
import { Button } from "@mui/material";

const AppointmentCard = ({ appointment, dark }) => {
    return (
        <div className="appointmentCard" style={{ backgroundColor: dark ? "#15202B" : "white" }}>
            <p style={{ color: dark ? "white" : "black" }}><b>Name:</b> {appointment.firstName} {appointment.lastName}</p>
            <p style={{ color: dark ? "white" : "black" }}><b>Roll ID:</b> {appointment.rollNum}</p>
            <p style={{ color: dark ? "white" : "black" }}><b>Email:</b> {appointment.email}</p>
            <p style={{ color: dark ? "white" : "black" }}><b>Date:</b> {appointment.date}</p>
            <p style={{ color: dark ? "white" : "black" }}><b>Reason:</b> {appointment.detail}</p>
            <Button onClick={() => window.open("mailto:" + appointment.email)}>Mail</Button>
        </div>
    );
};

export default AppointmentCard;
