import React from "react";
import styles from "./Card.module.scss";

interface CardProps {
  id: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  onClick?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  actions,
  onClick,
}) => {
  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={() => onClick && onClick(id)}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        {description && (
          <p className={styles.description}>
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </p>
        )}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default Card;
