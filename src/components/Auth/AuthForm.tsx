import styles from "./AuthForm.module.scss";
import Button from "../common/Button";
import InputField, { InputFieldProps } from "../common/InputField";

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  fields: InputFieldProps[];
  buttonText: string;
  isSubmitting: boolean;
  errorMessage?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  fields,
  buttonText,
  isSubmitting,
  errorMessage,
}) => (
  <form onSubmit={onSubmit} className={styles.formContainer}>
    {fields.map((field) => (
      <InputField key={field.id} {...field} />
    ))}
    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    <Button type="submit" variant="primary" disabled={isSubmitting}>
      {isSubmitting ? `${buttonText}...` : buttonText}
    </Button>
  </form>
);

export default AuthForm;
