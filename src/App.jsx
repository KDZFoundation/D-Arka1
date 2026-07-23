import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Workshops from "@/pages/Workshops";
import Ecology from "@/pages/Ecology";
import Projects from "@/pages/Projects";
import Strategy from "@/pages/Strategy";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import WordPressPage from "@/pages/WordPressPage";
import Admin from "@/pages/Admin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/warsztaty-cyfrowe" element={<Workshops />} />
            <Route path="/ekologia" element={<Ecology />} />
            <Route path="/projekty" element={<Projects />} />
            <Route path="/strategia" element={<Strategy />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/:slug" element={<WordPressPage />} />
          </Routes>
        </Layout>
        <LoginModal />
        <Toaster position="top-center" theme="dark" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

