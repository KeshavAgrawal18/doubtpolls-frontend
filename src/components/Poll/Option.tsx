import React from "react";
import Button from "@/components/common/Button";
import styles from "./Option.module.scss";
import InputField from "../common/InputField";

interface OptionProps {
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  canDelete: boolean;
  isDisabled?: boolean;
}

const Option: React.FC<OptionProps> = ({
  value,
  index,
  onChange,
  onDelete,
  canDelete,
  isDisabled,
}) => {
  return (
    <div className={styles.optionRow}>
      <InputField
        className={styles.optionInput}
        type="text"
        placeholder={`Option ${index + 1}`}
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
      />
      {canDelete && (
        <Button
          variant="transparent"
          onClick={() => onDelete(index)}
          disabled={isDisabled}
        >
          ✖
        </Button>
      )}
    </div>
  );
};

export default Option;
