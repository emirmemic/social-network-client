import "./App.css";
import PostsPage from "./pages/Posts/PostsPage";
import Post from "./components/post/Posts";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PostShare from "./components/post/postShare";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/users" element={<UsersPage />} />
          <Route exact path="/posts" element={<PostsPage />} />
          <Route exact path="/post/:id" element={<PostShare />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
