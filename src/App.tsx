import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import PollDetails from "./pages/Polls/PollDetails";
import CreatePoll from "./pages/Polls/CreatePoll";
import EditPoll from "./pages/Polls/EditPoll";
import Results from "./pages/Results/Results";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout";
import Auth from "./pages/Auth/Auth";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import { PollProvider } from "./contexts/PollContext";
import { VotesProvider } from "./contexts/VotesContext";
import PrivateRoutes from "./routes/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <VotesProvider>
            <PollProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Auth type="login" />} />
                  <Route path="register" element={<Auth type="register" />} />

                  <Route element={<PrivateRoutes />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="polls/create" element={<CreatePoll />} />
                    <Route path="polls/:id" element={<PollDetails />} />
                    <Route path="polls/:pollId/edit" element={<EditPoll />} />
                    <Route path="results/:pollId" element={<Results />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </PollProvider>
          </VotesProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
