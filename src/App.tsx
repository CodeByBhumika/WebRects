import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./pages/blogContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Posts from "./components/Posts";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />

          {/* blog post routes */}
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/edit/:id" element={<EditPost />} />

          {/* fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;
