import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditPoll.module.scss";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { usePoll } from "@/contexts/PollContext";

interface PollOption {
  id: string;
  label: string;
}

interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
}

const EditPoll: React.FC = () => {
  const { pollId } = useParams<{ pollId: string }>();
  const navigate = useNavigate();
  const { polls, updatePoll } = usePoll();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    options: [] as PollOption[],
  });

  // Populate formData based on pollId
  useEffect(() => {
    if (polls && pollId) {
      const selectedPoll = polls.find((p: Poll) => p.id === pollId);
      if (selectedPoll) {
        setFormData({
          title: selectedPoll.title || "",
          description: selectedPoll.description || "",
          options: selectedPoll.options || [],
        });
      }
    }
  }, [pollId, polls]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index].label = value;

      return { ...prev, options: updatedOptions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollId) return;
    updatePoll(pollId, formData);
    navigate(`/polls/${pollId}`);
  };

  return (
    <div className={styles.EditPoll}>
      <header className={styles.header}>
        <h1>Edit Poll</h1>
      </header>
      <main className={styles.mainContent}>
        <form className={styles.pollForm} onSubmit={handleSubmit}>
          <InputField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter poll title"
            required
          />
          <InputField
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter poll description"
            required
            rows={4}
          />
          <div className={styles.optionsSection}>
            <h3>Options</h3>
            {formData.options.map((option, index) => (
              <div key={index} className={styles.optionInput}>
                <InputField
                  type="text"
                  value={option.label}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditPoll;
