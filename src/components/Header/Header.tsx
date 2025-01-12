import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/">DoubtPolls</Link>
        </h1>
        <nav>
          <ul className={styles.navLinks}>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/polls/create">Create Poll</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button className={styles.logoutButton} onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
