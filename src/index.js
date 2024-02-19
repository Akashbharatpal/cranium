import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './Login';
import PageNotFound from './PageNotFound';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif', // Use "Inter" font as the default
  },
});

// Custom function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if(token)
  return true;
else return false; 
};

// ProtectedRoute component to conditionally render routes based on authentication status
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// const router = createBrowserRouter();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<ProtectedRoute element={<App />} />} />
          <Route path="*" element={<ProtectedRoute element={<PageNotFound />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
