import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
