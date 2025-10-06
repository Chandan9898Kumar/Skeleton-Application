import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Enable React support with JSX transformation and fast refresh
  plugins: [react()],

  resolve: {
    // Path aliases for cleaner imports and better maintainability
    alias: {
      "@": path.resolve(__dirname, "./src"), // @/components/Button instead of ../../../components/Button
      "@components": path.resolve(__dirname, "./src/components"), // Direct component imports
      "@pages": path.resolve(__dirname, "./src/pages"), // Direct page imports
      "@styles": path.resolve(__dirname, "./src/styles"), // Direct style imports
      "@api": path.resolve(__dirname, "./src/api"), // Direct API imports
    },
  },

  server: {
    port: 3000, // Custom dev server port
    host: true, // Expose to network (0.0.0.0) - allows mobile testing on same network
    open: true, // Auto-open browser on server start
    cors: true, // Enable CORS for cross-origin requests
    proxy: {
      // Proxy API calls to backend server during development
      "/api": {
        target: "http://localhost:5000", // Backend server URL
        changeOrigin: true, // Change origin header to target URL
        secure: false, // Allow HTTP proxy (not HTTPS)
      },
    },
  },

  preview: {
    port: 4173, // Port for production preview (vite preview)
    host: true, // Expose preview to network for testing
  },

  build: {
    outDir: "dist", // Output directory for production build
    sourcemap: true, // Generate source maps for debugging production issues
    minify: "esbuild", // Use esbuild for faster minification (vs terser)
    target: "esnext", // Target modern browsers for smaller bundle size
    chunkSizeWarningLimit: 1000, // Warn if chunks exceed 1MB (helps identify large bundles)
    rollupOptions: {
      output: {
        // Custom file naming with hash for cache busting
        entryFileNames: "assets/[name].[hash].js", // main.abc123.js
        chunkFileNames: "assets/[name].[hash].js", // vendor.def456.js
        assetFileNames: "assets/[name].[hash].[ext]", // logo.ghi789.png
        // Split code into separate chunks for better caching
        manualChunks: {
          vendor: ["react", "react-dom"], // Core React libraries
          router: ["react-router-dom"], // Routing library
          query: ["@tanstack/react-query"], // Data fetching library
        },
      },
    },
  },

  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server startup
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
    ],
    // Don't pre-bundle these (they're already optimized)
    exclude: ["@vite/client", "@vite/env"],
  },

  css: {
    devSourcemap: true, // Generate CSS source maps in development
    preprocessorOptions: {
      scss: {
        // Auto-import SCSS variables in all SCSS files
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },

  define: {
    // Define global constants available in your app
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version), // Access via __APP_VERSION__
  },

  esbuild: {
    // Remove console.log and debugger statements in production
    drop: ["console", "debugger"], // Cleaner production code
  },
});
