// utils/auth.js

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists
  };
  
  export const getRole = () => {
    return localStorage.getItem("role"); // Return the role from localStorage
  };
  