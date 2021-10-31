import React, { useState, useContext } from "react";
import axios from "axios";
import "./CommentInput.css";
// endpoint
import { ADD_COMMENT_ENDPOINT } from "../../../constants/endpoints";
// contexts
import UserContext from "../../../contexts/User";
// components
import Loader from "../../../components/loader/Loader";
// material-ui
import { TextField, IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const CommentInput = ({ postId, setComments, dark }) => {
    const { user } = useContext(UserContext);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleComment = e => {
        e.preventDefault();

        if (content) {
            const comment = { name: user.name, professionalAffiliation: user.professionalAffiliation, content, date: new Date().toString().substring(0, 21) };
            try {
                setLoading(true);
                axios.patch(ADD_COMMENT_ENDPOINT + "/" + postId, comment)
                    .then(res => {
                        const post = document.querySelector(".post__container");
                        setComments(comments => ([...comments, comment]));
                        setLoading(false);
                        post.scrollTop = post.scrollHeight - post.clientHeight;
                    })
                    .catch(err => { setLoading(false); })
            } catch (err) { setLoading(false); }
        };
        setContent("");
    }


    return (
        <form className="commentInput" onSubmit={e => handleComment(e)}>
            {loading ? <Loader /> : null}
            <TextField label="What's on your mind?" variant="standard" style={{ flex: 1, margin: "0 10px" }} value={content} onChange={e => setContent(e.target.value)} className={dark ? "commentInput__darkTF" : ""} />
            <IconButton type="submit" style={{ backgroundColor: !content ? "lightgrey" : "teal" }}><SendRoundedIcon /></IconButton>
        </form>
    );
};

export default CommentInput;
