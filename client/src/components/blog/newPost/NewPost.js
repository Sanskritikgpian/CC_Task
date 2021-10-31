import React, { useState } from "react";
import axios from "axios";
import "./NewPost.css";
// constants
import { ADD_POST_ENDPOINT } from "../../../constants/endpoints";
// components
import Loader from "../../../components/loader/Loader";
// material-ui
import { TextareaAutosize, TextField, Button } from "@mui/material";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";

const NewPost = ({ setPosts, setAlert, dark }) => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNewPost = e => {
        e.preventDefault();
        const postData = { name, title, content, date: new Date().toString().substring(0, 15), views: 0, comments: [] };

        try {
            setLoading(true);
            axios.post(ADD_POST_ENDPOINT, postData)
                .then(res => {
                    setPosts(posts => ([{ ...postData, _id: res.data._id }, ...posts]));
                    setLoading(false);
                    setAlert(true);
                })
                .catch(err => { setLoading(false); })
        } catch (err) { setLoading(false); }

    };

    return (
        <form className="newPost" onSubmit={e => handleNewPost(e)}>
            <p className="newPost__title" style={dark ? { color: "white", backgroundColor: "#15202B" } : {}}><ContactSupportRoundedIcon style={dark ? { color: "white" } : {}} />What's on your mind?</p>
            {loading ? <Loader /> : null}
            <TextField variant="standard" label="Enter your name" value={name} onChange={e => setName(e.target.value)} inputProps={{ maxLength: 25 }} className={dark ? "newPost__darkTF" : ""}
            />
            <TextField variant="standard" label="Enter post's title" value={title} onChange={e => setTitle(e.target.value)} inputProps={{ maxLength: 25 }} className={dark ? "newPost__darkTF" : ""} />
            <TextareaAutosize aria-label="minimum height" placeholder="What's on your mind?" value={content} onChange={e => setContent(e.target.value)} className={dark ? "newPost__darkTA" : ""} />
            <Button type="submit" disabled={!(content && title)} style={!(content && title) ? { backgroundColor: "lightgrey" } : {}}>Post</Button>
        </form>
    );
};

export default NewPost;
