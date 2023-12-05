import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";

function EditPostForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current post by id
        const fetchCurrentPost = async () => {
            try {
                const json = await fetchPost(id);
                setPost(json);
            } catch (e) {
                console.error("Haber alınamadı: ", e);
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPost = {
            title: post.title,
            body: post.body,
        };

        try {
            await updatePost(id, updatedPost);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.error("Haber güncellenemedi: ", e);
        }
    };

    if (!post) return <h2>Yükleniyor...</h2>;

    return (
        <div>
            <h2>Haber Düzenle</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="post-title">Başlık</label>
                    <br />
                    <input
                        type="text"
                        id="post-title"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="post-body">Metin</label>
                    <br />
                    <textarea
                        id="post-body"
                        value={post.body}
                        onChange={(e) => setPost({ ...post, body: e.target.value })}
                    />
                </div>
                <div>
                    <button type="submit">Kaydet</button>
                </div>
            </form>
        </div>
    );
}

export default EditPostForm;