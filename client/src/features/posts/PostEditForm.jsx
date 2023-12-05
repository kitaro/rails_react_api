import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";
import PostForm from "./PostForm";

function EditPostForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current post by id
        const fetchCurrentPost = async () => {
            try {
                const json = await fetchPost(id);
                setPost(json);
            } catch (e) {
                console.error("Haber alınamadı: ", e);
            }
        };
        fetchCurrentPost();
    }, [id]);

    const handleUpdateSubmit = async (formData) => {
        try {
            await updatePost(id, formData);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.error("Güncelleme başarısız: ", e);
        }
    };

    if (!post) return <h2>Loading...</h2>;

    return (
        <PostForm
            post={post}
            onSubmit={handleUpdateSubmit}
            headerText="Haber Düzenle"
            buttonText="Kaydet"
        />
    );
}

export default EditPostForm;