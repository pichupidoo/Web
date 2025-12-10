import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { authService } from "./services/authService";
import Login from "./components/Login";
import Register from "./components/Register";
import ValeraList from "./components/ValeraList";
import ValeraStats from "./components/ValeraStats";

function PrivateRoute({ children }) {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <ValeraList />
              </PrivateRoute>
            }
          />

          <Route
            path="/valera/:id"
            element={
              <PrivateRoute>
                <ValeraStats />
              </PrivateRoute>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
