import React from "react"
import {Link, Route, Routes} from "react-router-dom";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import NewPostForm from "../features/posts/NewPostForm.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="/new" element={<NewPostForm />} />
        </Routes>
    )
}

export default AppRoutes;