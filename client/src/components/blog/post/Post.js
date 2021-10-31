import React, { useEffect, useContext } from "react";
import "./Post.css";
// material-ui
import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
// components
import Comments from "../comments/Comments";
// contexts
import UserContext from "../../../contexts/User";
// consts
const postPhotoURL = "https://source.unsplash.com/1600x900/?quotes";

const Post = ({ post, setPostState, comments, setComments, dark }) => {
    const { user } = useContext(UserContext);

    useEffect(() => {
        const handleScrollEvents = () => {
            const post = document.querySelector(".post__container");
            const scrollToTopBtn = document.querySelector(".post__scrollToTopBtn");
            scrollToTopBtn.style.transform = post.scrollTop > 10 ? "scale(1)" : "scale(0)";
        };

        const post = document.querySelector(".post__container");
        post.addEventListener("scroll", handleScrollEvents)
        return () => document.removeEventListener("scroll", handleScrollEvents)
    }, [])

    const goToDiscussion = e => {
        const post = document.querySelector(".post__container");
        const comments = document.querySelector(".comments");
        const commentInput = document.querySelector(".commentInput").querySelector("input");
        post.scrollTo(0, comments.getBoundingClientRect().top + post.scrollTop);
        commentInput.focus();
    };

    const scrollToTop = () => {
        const post = document.querySelector(".post__container");
        post.scrollTo(0, 0);
    };

    return (
        <div className="post" style={dark ? { backgroundColor: "#192734" } : {}}>
            <IconButton onClick={() => scrollToTop()} className="post__scrollToTopBtn" style={{ position: "fixed", bottom: "10px", right: "10px", color: "white", backgroundColor: "green", border: "2px solid white" }}><ArrowUpwardRoundedIcon style={{ fontSize: "30px" }} /></IconButton>
            {user ? <IconButton onClick={e => goToDiscussion(e)} style={{ position: "fixed", bottom: "10px", left: "10px", color: "white", backgroundColor: "teal", border: "2px solid white" }}><QuestionAnswerRoundedIcon style={{ fontSize: "30px" }} /></IconButton> : null}
            <IconButton onClick={() => setPostState(false)} style={{ position: "fixed", top: "10px", right: "10px", color: "red", backgroundColor: "white" }}><CloseRoundedIcon style={{ fontSize: "30px" }} /></IconButton>
            <img src={postPhotoURL} alt="" className="post__photo" />
            <div className="post__container">
                <div className="post__main">
                    <p className="post__date">{post.date}</p>
                    <p className="post__title" style={{ color: dark ? "white" : "teal" }}>{post.title}</p>
                    <p className="post__name">{post.name ? "from " + post.name : "from Anonymous"}</p>
                    <p className="post__content" style={{ color: dark ? "white" : "black" }}>{post.content}</p>
                </div>
                <p className="post__viewsCount"><RemoveRedEyeRoundedIcon />{post.views} {post.views === 1 ? "view" : "views"}</p>
                <Comments postId={post._id} comments={comments} setComments={setComments} dark={dark} />
            </div>
        </div>
    );
};

export default Post;
