import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";

function NewPostForm() {
    const navigate = useNavigate();

    const handleCreateSubmit = async (rawData) => {
        const formData = new FormData();
        formData.append("post[title]", rawData.title);
        formData.append("post[body]", rawData.body);
        formData.append("post[image]", rawData.image);
        try {
            const response = await createPost(formData);
            navigate(`/posts/${response.id}`);
        } catch (e) {
            console.error("Yeni haber kaydedilmedi: ", e);
        }
    };

    return (
        <PostForm
            headerText="Yeni Haber"
            onSubmit={handleCreateSubmit}
            buttonText="Kaydet"
        />
    );
}

export default NewPostForm;