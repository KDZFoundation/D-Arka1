import { createContext, useContext, useState, useEffect } from "react";

const ADMIN_EMAIL = "fundacja@d-arka.org";

const AuthContext = createContext({
  userEmail: "",
  isAdmin: false,
  login: (email) => {},
  logout: () => {},
  showLoginModal: false,
  setShowLoginModal: (val) => {},
});

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("darka_user_email") || "";
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isAdmin = userEmail?.toLowerCase().trim() === ADMIN_EMAIL;

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("darka_user_email", userEmail);
    } else {
      localStorage.removeItem("darka_user_email");
    }
  }, [userEmail]);

  const login = (email) => {
    setUserEmail(email);
    setShowLoginModal(false);
  };

  const logout = () => {
    setUserEmail("");
    setShowLoginModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        isAdmin,
        login,
        logout,
        showLoginModal,
        setShowLoginModal,
        ADMIN_EMAIL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
