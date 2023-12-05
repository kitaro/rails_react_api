import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PostForm from "./PostForm";

describe("PostForm component", () => {
    // Post is null by default, for the instance when a new post is being created
    it("renders default inputs when no post prop is passed", () => {
        // Because headertext is required, we can't render the component without it
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const { getByLabelText } = render(
            <PostForm
                buttonText={buttonText}
                headerText="Yeni Haber"
                onSubmit={mockSubmit}
            />
        );
        expect(getByLabelText(/Başlık/i)).toBeInTheDocument();
        expect(getByLabelText(/Metin/i)).toBeInTheDocument();
    });

    it("renders passed in post data", () => {
        const mockPost = {
            title: "Test Post",
            body: "This is a test post.",
        };
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const { getByLabelText } = render(
            <PostForm
                buttonText={buttonText}
                headerText="Yeni Haber"
                onSubmit={mockSubmit}
                post={mockPost}
            />
        );

        expect(getByLabelText(/Başlık/i)).toBeInTheDocument();
        expect(getByLabelText(/Metin/i)).toBeInTheDocument();
        expect(getByLabelText(/Başlık/i).value).toBe(mockPost.title);
        expect(getByLabelText(/Metin/i).value).toBe(mockPost.body);
    });

    it("updates input value on change", () => {
        const mockSubmit = jest.fn();
        const buttonText = "Kaydet";
        const headerText = "Yeni Haber";
        const { getByLabelText } = render(
            <PostForm
                buttonText={buttonText}
                headerText={headerText}
                onSubmit={mockSubmit}
            />
        );

        const titleInput = getByLabelText(/Başlık/i);
        const newTitle = "Test Post";
        fireEvent.change(titleInput, { target: { value: newTitle } });
        expect(titleInput.value).toBe(newTitle);
    });

    it("calls onSubmit with the form data when submitted", async () => {
        const mockSubmit = jest.fn();
        const buttonText = "Kaydet";
        const headerText = "Yeni Haber";

        const { getByLabelText, getByRole } = render(
            <PostForm
                buttonText={buttonText}
                headerText={headerText}
                onSubmit={mockSubmit}
            />
        );

        const titleInput = getByLabelText(/Başlık/i);
        const bodyInput = getByLabelText(/Metin/i);
        const newTitle = "Test Post";
        const newBody = "This is a test post.";

        fireEvent.change(titleInput, { target: { value: newTitle } });
        fireEvent.change(bodyInput, { target: { value: newBody } });
        await act(async () => {
            fireEvent.click(getByRole("button", { name: /Kaydet/i }));
        });
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({ title: newTitle, body: newBody });
    });
});