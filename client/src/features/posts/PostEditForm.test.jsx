import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";
import { act } from "react-dom/test-utils";
import PostEditForm from "./PostEditForm";

jest.mock("../../services/postService", () => ({
    fetchPost: jest.fn(),
    updatePost: jest.fn(),
}));

describe("PostEditForm component", () => {
    const mockPost = {
        title: "Original Post Title",
        body: "Original Post Body",
    };

    const renderForm = () =>
        render(
            <MemoryRouter initialEntries={["/posts/1/edit"]}>
                <Routes>
                    <Route path="/posts/:id/edit" element={<PostEditForm />} />
                    <Route path="/posts/:id" element={<h1>Haber Detayı</h1>} />
                </Routes>
            </MemoryRouter>
        );

    beforeEach(() => {
        fetchPost.mockResolvedValue(mockPost);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the PostEditForm component", async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument();
    });

    it("successfully updates the post and redirects", async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        const newPost = {
            title: "Yeni Haber Başlığı",
            body: "Yeni Haber Metni",
        };

        fireEvent.change(screen.getByLabelText(/Başlık/i), {
            target: { value: newPost.title },
        });

        fireEvent.change(screen.getByLabelText(/Metin/i), {
            target: { value: newPost.body },
        });

        await act(async () => {
            fireEvent.click(screen.getByText(/Kaydet/i));
        });

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
            expect(updatePost).toHaveBeenCalledWith("1", newPost);
        });

        expect(screen.getByText("Haber Detayı")).toBeInTheDocument();
    });

    it("shows a console error on update failure", async () => {
        updatePost.mockRejectedValueOnce(new Error("Güncelleme başarısız"));

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            fireEvent.click(screen.getByText(/Kaydet/i));
        });

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
        });
        expect(consoleSpy).toHaveBeenCalledWith(
            "Haber güncellenemedi: ",
            Error("Güncelleme başarısız")
        );
    });

    it("handles error when fetching the post", async () => {
        const expectedError = new Error("Fetch failed");
        fetchPost.mockRejectedValueOnce(expectedError);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            "Haber alınamadı: ",
            expectedError
        );
    });
});