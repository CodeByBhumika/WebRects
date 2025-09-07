import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BlogProvider } from "./pages/blogContext"; // adjust path if needed

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ✅ Wrap App with BlogProvider */}
    <BlogProvider>
      <App />
    </BlogProvider>
  </React.StrictMode>
);
