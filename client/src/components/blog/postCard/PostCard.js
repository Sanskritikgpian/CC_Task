import React, { useState, useContext } from "react";
import axios from "axios";
import "./PostCard.css";
// contexts
import UserContext from "../../../contexts/User";
// constants
import { DELETE_POST_ENDPOINT, VIEWED_ENDPOINT } from "../../../constants/endpoints";
// constants
import Loader from "../../../components/loader/Loader";
// material-ui
import { Button, IconButton, Snackbar, Alert } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
// funcs
const truncate = (str, len, suffix) => str.substring(0, len) + suffix;

const PostCard = ({ post, setPost, setPosts, setPostState, setComments, fullWidth, dark }) => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [views, setViews] = useState(post.views);

    const deletePost = () => {
        const areYouSure = window.confirm("Are you sure you wish to permanently delete the post?");
        if (areYouSure) {
            try {
                setLoading(true);
                axios.patch(DELETE_POST_ENDPOINT + "/" + post._id, {})
                    .then(res => {
                        setPosts(posts => posts.filter(p => p._id !== post._id));
                        setLoading(false);
                        setAlert(true);
                    })
                    .catch(err => { setLoading(false); })
            } catch (err) { setLoading(false); }
        }
    };

    const viewedPost = () => {
        setViews(views => views + 1);
        try {
            axios.patch(VIEWED_ENDPOINT + "/" + post._id + "&" + views, {})
                .then(res => { })
                .catch(err => { })
        } catch (err) { }
    };

    const handlePostClick = () => {
        setPost(post);
        setComments(post.comments);
        setPostState(true);
        viewedPost();
    };

    return (
        <div className="postCard" style={{ width: fullWidth ? "100%" : "300px", minHeight: fullWidth ? "200px" : "250px", backgroundColor: dark ? "#15202B" : "white" }} >
            {loading ? <Loader /> : null}
            {user ? <IconButton onClick={() => deletePost()} style={{ backgroundColor: dark ? "lightcoral" : "red" }}><DeleteRoundedIcon /></IconButton> : null}
            <Snackbar open={alert} autoHideDuration={10000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: "100%" }}>Post was deleted successfully!</Alert>
            </Snackbar>
            <p className="postCard__date">{post.date}</p>
            <p className="postCard__title" style={{ color: dark ? "white" : "#1976d2" }}>{post.title}</p>
            <p className="postCard__name">{post.name ? "from " + post.name : "from Anonymous"}</p>
            <p className="postCard__content" style={{ color: dark ? "white" : "black" }}>{!fullWidth ? truncate(post.content, 150, "...") : post.content}</p>
            <Button onClick={() => handlePostClick()}>View</Button>
            <p className="postCard__viewsCount"><RemoveRedEyeRoundedIcon />{post.views} {post.views === 1 ? "view" : "views"}</p>
        </div >
    );
};

export default PostCard;
