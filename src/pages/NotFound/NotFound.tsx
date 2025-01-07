import React from "react";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>404 - Page Not Found</h1>
      <p className={styles.notFound__message}>
        Sorry, the page you are looking for does not exist. Please check the URL
        or return to the homepage.
      </p>
      <button className={styles.notFound__button} onClick={handleBackToHome}>
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
