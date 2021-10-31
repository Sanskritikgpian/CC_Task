import React from "react";
import "./Loader.css";
// material-ui
import { CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <div className="loader">
            <CircularProgress style={{ color: "white" }} />
        </div>
    );
};

export default Loader;
