import React from "react";
import Button from "../Button";
import Modal from "./Modal";
import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isModalOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Confirm Delete</h3>
        <p className={styles.modalMessage}>
          Are you sure you want to delete this poll? This action cannot be
          undone.
        </p>
        <div className={styles.modalActions}>
          <Button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
