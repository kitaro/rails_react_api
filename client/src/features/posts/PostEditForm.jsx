import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService"
function PostEditForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const json = await fetchPost(id);
                setPost(json);
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        };
        fetchCurrentPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPost = {
            title: post.title,
            body: post.body,
        }
        try {
            const response = await updatePost(id, updatedPost)
            navigate(`/posts/${response.id}`);
        } catch (e) {
            console.error("Güncelleme yapılamadı:", e)
        }
    };

    if (!post) return <h2>Yükleniyor...</h2>;

    return (
        <div>
            <h2>Haber Düzenle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="post-title">Başlık:</label><br />
                    <input id="post-title" type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} required />
                </div>
                <div>
                    <label htmlFor="post-body">Metin:</label><br />
                    <textarea id="post-body" type="text" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} required />
                </div>
                <div>
                    <button type="submit">Kaydet</button>
                </div>
            </form>
        </div>
    )
}

export default PostEditForm