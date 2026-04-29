import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import PollDetails from "./pages/Polls/PollDetails";
import CreatePoll from "./pages/Polls/CreatePoll";
import EditPoll from "./pages/Polls/EditPoll";
import Results from "./pages/Results/Results";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout";
import Auth from "./pages/Auth/Auth";

import Product from "./pages/Product/Product";
import UseCases from "./pages/UseCases/UseCases";
import Pricing from "./pages/Pricing/Pricing";

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
                  {/* Public */}
                  <Route index element={<Home />} />
                  <Route path="product" element={<Product />} />
                  <Route path="use-cases" element={<UseCases />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="login" element={<Auth type="login" />} />
                  <Route path="register" element={<Auth type="register" />} />

                  {/* Protected */}
                  <Route element={<PrivateRoutes />}>
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* decision routes */}
                    <Route path="decisions/create" element={<CreatePoll />} />
                    <Route path="decisions/:id" element={<PollDetails />} />
                    <Route path="decisions/:id/edit" element={<EditPoll />} />
                    <Route path="decisions/:id/results" element={<Results />} />
                  </Route>

                  {/* 404 */}
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
