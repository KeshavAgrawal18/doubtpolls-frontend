import React, { useState } from "react";
import styles from "./CreatePoll.module.scss";

const CreatePoll: React.FC = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>([""]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, options });
  };

  return (
    <div className={styles.createPoll}>
      <h1>Create a New Poll</h1>
      <form className={styles.createPoll__form} onSubmit={handleSubmit}>
        <input
          className={styles.createPoll__input}
          type="text"
          placeholder="Poll Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            className={styles.createPoll__input}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <button
          type="button"
          className={styles.createPoll__button}
          onClick={handleAddOption}
        >
          Add Option
        </button>
        <button type="submit" className={styles.createPoll__button}>
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
