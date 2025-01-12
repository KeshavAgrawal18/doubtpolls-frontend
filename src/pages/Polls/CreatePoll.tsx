import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./CreatePoll.module.scss";
import Button from "@/components/common/Button";
import { usePoll } from "@/contexts/PollContext";
import Option from "@/components/Poll/Option";

const CreatePoll: React.FC = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    options: [""],
  });
  const [errors, setErrors] = useState({ title: "", options: "" });

  const { addPoll, isLoading } = usePoll(); // Access isLoading state from context
  const navigate = useNavigate();

  const handleInputChange = (
    field: string,
    value: string | string[],
    index?: number
  ) => {
    setFormState((prevState) => {
      if (field === "options" && index !== undefined) {
        const updatedOptions = [...prevState.options];
        updatedOptions[index] = value as string;
        return { ...prevState, options: updatedOptions };
      }
      return { ...prevState, [field]: value };
    });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear errors on change
  };

  const modifyOptions = (action: "add" | "delete", index?: number) => {
    setFormState((prevState) => {
      const updatedOptions =
        action === "add"
          ? [...prevState.options, ""]
          : prevState.options.filter((_, i) => i !== index);

      return { ...prevState, options: updatedOptions };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const filteredOptions = formState.options.filter(
      (opt) => opt.trim() !== ""
    );
    const { title, description } = formState;

    // Validate form fields
    const newErrors = {
      title: !title.trim() ? "Poll title is required." : "",
      options:
        filteredOptions.length < 2
          ? "Please provide at least two valid options."
          : "",
    };

    if (newErrors.title || newErrors.options) {
      setErrors(newErrors);
      return;
    }

    try {
      await addPoll({ title, description, options: filteredOptions });
      navigate("/");
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const { title, description, options } = formState;

  return (
    <div className={styles.createPoll}>
      <h1>Create a New Poll</h1>
      <form className={styles.createPoll__form} onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className={styles.createPoll__field}>
          <input
            className={styles.createPoll__input}
            type="text"
            placeholder="Poll Title"
            value={title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            disabled={isLoading} // Disable input during loading
          />
          {errors.title && (
            <p className={styles.createPoll__error}>{errors.title}</p>
          )}
        </div>

        {/* Description Input */}
        <div className={styles.createPoll__field}>
          <textarea
            className={styles.createPoll__textarea}
            placeholder="Poll Description (optional)"
            value={description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            disabled={isLoading} // Disable textarea during loading
          />
        </div>

        {/* Options */}
        {options.map((option, index) => (
          <Option
            key={index}
            value={option}
            index={index}
            onChange={(index, value) =>
              handleInputChange("options", value, index)
            }
            onDelete={(index) => modifyOptions("delete", index)}
            canDelete={options.length > 1}
            isDisabled={isLoading} // Disable option inputs during loading
          />
        ))}
        {errors.options && (
          <p className={styles.createPoll__error}>{errors.options}</p>
        )}

        {/* Actions */}
        <div className={styles.createPoll__actions}>
          <Button
            className={styles.createPoll__button}
            onClick={() => modifyOptions("add")}
            disabled={isLoading} // Disable Add Option button during loading
          >
            Add Option
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Poll"}{" "}
            {/* Show spinner or text */}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
