import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {API_URL} from "../../constants.js";

function NewPostForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = { title, body };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            const { id } = await response.json();
            navigate(`/posts/${id}`);
        }
    }

    return (
        <div>
            <h2>Yeni Haber Formu</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titleInput">Başlık:</label>
                    <input id="titleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="bodyInput">Metin:</label>
                    <textarea id="bodyInput" type="text" value={body} onChange={(e) => setBody(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Kaydet</button>
                </div>
            </form>
        </div>
    )
};

export default NewPostForm;