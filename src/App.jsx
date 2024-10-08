import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignupCard from "./components/LoginSignup/SignupCard";
import LoginCard from "./components/LoginSignup/LoginCard";
import ContactUsCard from "./components/contacts/ContactUsCard";
import HomePage from "./components/HomePage.jsx"; // You'll need to create this component
import { useSelector } from "react-redux";

function App() {
  const [theme, colorMode] = useMode();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <ColorModeContext.Provider 
// @ts-ignore
    value={colorMode}>
      <ThemeProvider 
// @ts-ignore
      theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupCard />} />
            <Route path="/login" element={<LoginCard />} />
            <Route path="/contact" element={<ContactUsCard />} />
            <Route 
              path="/" 
              element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;