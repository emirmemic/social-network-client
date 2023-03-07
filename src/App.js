import "./App.css";
import PostsPage from "./pages/Posts/PostsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
