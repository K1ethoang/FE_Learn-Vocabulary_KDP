import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.lottie"],
  server: {
    proxy: {
      // Forward all API requests to the backend server
      "/api": {
        target: "http://localhost:9091", // Backend URL
        changeOrigin: true, // Handle CORS by changing the origin
        secure: false, // If the backend uses HTTPS and a self-signed certificate
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"), // Optional: Add version prefix
      },
    },
  },
});
