import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import PollDetails from "./pages/Polls/PollDetails";
import CreatePoll from "./pages/Polls/CreatePoll";
import Results from "./pages/Results/Results";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout";
import Auth from "./pages/Auth/Auth";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

const samplePoll = {
  title: "Favorite Programming Language",
  options: [
    { option: "JavaScript", votes: 150 },
    { option: "Python", votes: 100 },
    { option: "TypeScript", votes: 50 },
  ],
};

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Auth type="login" />} />
              <Route path="register" element={<Auth type="register" />} />
              <Route path="profile" element={<Profile />} />
              <Route path="polls/create" element={<CreatePoll />} />
              <Route
                path="polls/:id"
                element={
                  <PollDetails
                    title={samplePoll.title}
                    options={samplePoll.options}
                  />
                }
              />
              <Route path="results/:id" element={<Results />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
