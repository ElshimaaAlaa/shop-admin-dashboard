import { useState } from "react";
export const TagsInput = ({ setFieldValue, values }) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTags = [...(values.tags || []), inputValue.trim()];
      setFieldValue("tags", newTags);
      setInputValue(""); // Clear the input
    }
  };

  const removeTag = (index) => {
    const newTags = (values.tags || []).filter((_, i) => i !== index);
    setFieldValue("tags", newTags);
  };

  return (
    <div className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 h-14 mt-5 focus-within:border-primary">
      <div className="flex flex-wrap gap-2">
        {(values.tags || []).map((tag, index) => (
          <div
            key={index}
            className="bg-customOrange-mediumOrange  rounded-md px-3 py-1 flex items-center justify-between gap-2"
          >
            <span className="text-15 text-primary mt-1">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-red-600 text-2x"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Tag Name"
          className="flex-grow outline-none placeholder:text-14"
        />
      </div>
    </div>
  );
};
