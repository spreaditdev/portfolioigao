import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import routes from "tempo-routes";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  // Add custom cursor class to body
  useEffect(() => {
    // Check if device is not touch-based (mobile devices)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      document.body.classList.add("custom-cursor-active");
    }

    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              Loading...
            </div>
          }
        >
          <>
            {/* Custom cursor for desktop devices */}
            <CustomCursor />

            {/* Scroll progress indicator */}
            <ScrollProgress color="#9333ea" height={4} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<LoginPage />} />
              {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
