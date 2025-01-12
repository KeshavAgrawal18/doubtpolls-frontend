import React from "react";
import styles from "./InputField.module.scss";

export interface InputFieldProps {
  id?: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  isDisabled?: boolean;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  error,
  isDisabled = false,
  rows,
}) => (
  <div className={styles.inputGroup}>
    {label && (
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
    )}
    {type === "textarea" ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={isDisabled}
        rows={rows}
        className={`${styles.inputField} ${
          error ? styles.inputFieldError : ""
        }`}
      />
    ) : (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={isDisabled}
        className={`${styles.inputField} ${
          error ? styles.inputFieldError : ""
        }`}
      />
    )}
    {error && <p className={styles.errorText}>{error}</p>}
  </div>
);

export default InputField;
