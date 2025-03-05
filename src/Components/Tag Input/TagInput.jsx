import { useState } from "react";

export const TagsInput = ({ setFieldValue, values }) => {
  const [inputValueEn, setInputValueEn] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const trimmedValue = e.target.value.trim();

      // Check for duplicate tags
      if (values.tags.en.includes(trimmedValue)) {
        console.log("Tag already exists:", trimmedValue);
        return;
      }

      // Add the tag to the English tags array
      const newTags = {
        ...values.tags,
        en: [...values.tags.en, trimmedValue],
      };

      setFieldValue("tags", newTags);
      setInputValueEn(""); // Clear input
    }
  };

  const removeTag = (index) => {
    const newTags = {
      ...values.tags,
      en: values.tags.en.filter((_, i) => i !== index),
    };
    setFieldValue("tags", newTags);
  };

  return (
    <div className="w-full">
      <div>
        <div className="flex flex-grow mt-3 h-14 gap-2 bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 focus-within:border-primary">
          {/* Render prefilled tags */}
          {values.tags.en.map((tag, index) => (
            <div
              key={index}
              className="bg-customOrange-mediumOrange rounded-md px-3 py-1 flex items-center justify-between gap-2"
            >
              <span className="text-15 text-primary mt-1">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-darkRed text-xl"
              >
                &times;
              </button>
            </div>
          ))}
          {/* Input field for new tags */}
          <input
            type="text"
            value={inputValueEn}
            onChange={(e) => setInputValueEn(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tags"
            className="outline-none placeholder:text-14"
          />
        </div>
      </div>
    </div>
  );
};