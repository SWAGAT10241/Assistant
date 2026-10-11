const envConfig = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.PROD
      ? "https://assistant-backend-is4z.onrender.com"
      : "http://localhost:8000"),
  IS_PROD: import.meta.env.PROD,
  IS_DEV: import.meta.env.DEV,
};

export default envConfig;
