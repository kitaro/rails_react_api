export const API_URL =
    process.env.NODE_ENV === "test"
        ? "http//domain.com"
        : import.meta.env.VITE_API_URL;
