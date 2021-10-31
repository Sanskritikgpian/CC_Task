import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Blog.css";
// constants
import { CC_IITKGP_URL } from "../../../constants/urls";
import { APPOINTMENTS_ROUTE, APPOINTMENT_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../../constants/routes";
// components
import Post from "../post/Post";
import NewPost from "../newPost/NewPost";
import PostCard from "../postCard/PostCard";
import SearchBox from "../searchBox/SearchBox";
// material-ui
import { Drawer, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Snackbar, Alert } from "@mui/material";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import EventIcon from "@mui/icons-material/Event";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
// contexts
import UserContext from "../../../contexts/User";

const Blog = ({ posts, setPosts, dark, handleDarkMode }) => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [post, setPost] = useState({});
    const [postState, setPostState] = useState(false);
    const [comments, setComments] = useState([]);
    const [alert, setAlert] = useState(false);
    const [search, setSearch] = useState("");

    const handleSignOut = () => {
        localStorage.removeItem("cc_task");
        history.push(SIGN_IN_ROUTE);
    };

    return (
        <div className="blog" style={dark ? { backgroundColor: "#192734" } : {}}>
            <div className="blog__intro">
                <h1>Welcome to CC Blog</h1>
                <p>A person's most beautiful useful asset is not a head full of knowledge, but a heart full of love, an ear ready to listen and a hand willing to help others.</p>
                <div className="blog__buttons">
                    <Button onClick={() => window.scrollTo(0, window.innerHeight - 75)}>Explore!</Button>
                    <Button onClick={() => window.open(CC_IITKGP_URL, "_blank")}>About us!</Button>
                </div>
            </div>
            <NewPost dark={dark} setPosts={setPosts} setAlert={setAlert} />
            <div className="blog__postCollection">
                <p style={dark ? { color: "white", backgroundColor: "#15202B", width: "100%" } : { width: "100%" }}><EventIcon style={dark ? { color: "white" } : {}} />Recent Posts</p>
                <div className="blog__posts">
                    {posts?.length ? posts.slice(0, 3).map((post, index) => <PostCard key={index} post={post} setPost={setPost} setPosts={setPosts} setPostState={setPostState} setComments={setComments} dark={dark} />) : <p style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: dark ? "white" : "gray", margin: "50px 0" }}>No posts yet.</p>}
                </div>
            </div>
            <div className="blog__postCollection">
                <p style={dark ? { color: "white", backgroundColor: "#15202B", width: "100%" } : { width: "100%" }}><PeopleRoundedIcon style={dark ? { color: "white" } : {}} />Most Viewed</p>
                <div className="blog__posts" >
                    {posts?.length ? [...posts].sort((a, b) => b.views - a.views).slice(0, 3).map((post, index) => <PostCard key={index} post={post} setPost={setPost} setPosts={setPosts} setPostState={setPostState} setComments={setComments} fullWidth dark={dark} />) : <p style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: dark ? "white" : "gray", margin: "50px 0" }}>No posts yet.</p>}
                </div>
            </div>
            <div className="blog__postCollection" style={{ marginBottom: "75px" }}>
                <SearchBox setSearch={setSearch} />
                <p style={dark ? { color: "white", backgroundColor: "#15202B" } : {}}><TodayIcon style={dark ? { color: "white" } : {}} />Older Posts</p>
                <div className="blog__posts">
                    {posts?.length ? posts.filter(post => JSON.stringify(post).toLowerCase().includes(search.toLowerCase())).map((post, index) => <PostCard key={index} post={post} setPost={setPost} setPosts={setPosts} setPostState={setPostState} setComments={setComments} dark={dark} />) : <p style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: dark ? "white" : "gray", margin: "50px 0" }}>No posts yet.</p>}
                </div>
            </div>
            <Drawer anchor={"bottom"} open={postState} onClose={() => setPostState(false)}>
                <Post post={post} setPostState={setPostState} comments={comments} setComments={setComments} dark={dark} />
            </Drawer>
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', right: 10, bottom: 10 }} icon={<SpeedDialIcon style={{ color: "white" }} />}>
                {!user ? <SpeedDialAction key={"book an appointment"} icon={<AssignmentIcon />} tooltipTitle={"book an appointment"} onClick={() => history.push(APPOINTMENT_ROUTE)} /> : null}
                {user ? <SpeedDialAction key={"Appointments"} icon={<PeopleAltRoundedIcon />} tooltipTitle={"Appointments"} onClick={() => history.push(APPOINTMENTS_ROUTE)} /> : null}
                {!user ? <SpeedDialAction key={"Sign in for counsellors"} icon={<VpnKeyRoundedIcon />} tooltipTitle={"Sign in for counsellors"} onClick={() => history.push(SIGN_IN_ROUTE)} /> : null}
                {!user ? <SpeedDialAction key={"Sign up for counsellors"} icon={<PersonAddRoundedIcon />} tooltipTitle={"Sign up for counsellors"} onClick={() => history.push(SIGN_UP_ROUTE)} /> : null}
                {user ? <SpeedDialAction key={"Sign out"} icon={<ExitToAppRoundedIcon />} tooltipTitle={"Sign out"} onClick={() => handleSignOut()} /> : null}
                <SpeedDialAction key={dark ? "Light mode" : "Dark mode"} icon={dark ? <Brightness4RoundedIcon /> : <DarkModeRoundedIcon />} tooltipTitle={dark ? "Light mode" : "Dark mode"} onClick={() => handleDarkMode()} />
            </SpeedDial>
            <Snackbar open={alert} autoHideDuration={10000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: "100%" }}>Your post was successful!</Alert>
            </Snackbar>
        </div>
    );
};

export default Blog;
