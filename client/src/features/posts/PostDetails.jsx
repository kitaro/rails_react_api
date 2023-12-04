import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost as deletePostService, fetchPost } from "../../services/postService"

function PostDetails() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const json = await fetchPost(id);
                setPost(json);
            } catch (e) {
                console.error("Bir hata oluştu:", e);
            }
        };
        fetchCurrentPost();
    }, [id]);

    const deletePost = async () => {
        try {
            await deletePostService(id);
            navigate("/");
        } catch (e) {
            console.error("Haber silinirken hata oldu:", e)
        }
    }

    if (!post) return <h2>Yükleniyor...</h2>

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${id}/edit`}>Düzenle</Link>
            {" | "}
            <Link to="/">Geri Dön</Link>
            {" | "}
            <button onClick={deletePost}> Sil </button>
        </div>
    )
}

export default PostDetails;