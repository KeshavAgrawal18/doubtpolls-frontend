import React from "react";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <div>
      <div className={styles.home}>
        <h1>Welcome to DoubtPolls</h1>
        <p>Engage with your audience and get their opinions with ease!</p>
      </div>
    </div>
  );
};

export default Home;
