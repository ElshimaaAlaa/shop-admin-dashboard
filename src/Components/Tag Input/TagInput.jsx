import { useState } from "react";

export const TagsInput = ({ setFieldValue, values }) => {
  const [inputValueEn, setInputValueEn] = useState("");
  const [inputValueAr, setInputValueAr] = useState("");

  const handleKeyDown = (e, language) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const trimmedValue = e.target.value.trim();

      // Check for duplicate tags
      if (values.tags[language].includes(trimmedValue)) {
        console.log("Tag already exists:", trimmedValue);
        return;
      }

      // Add the tag to the appropriate language tags array
      const newTags = {
        ...values.tags,
        [language]: [...values.tags[language], trimmedValue],
      };

      setFieldValue("tags", newTags);

      // Clear input based on language
      if (language === "en") {
        setInputValueEn("");
      } else if (language === "ar") {
        setInputValueAr("");
      }
    }
  };

  const removeTag = (index, language) => {
    const newTags = {
      ...values.tags,
      [language]: values.tags[language].filter((_, i) => i !== index),
    };
    setFieldValue("tags", newTags);
  };

  return (
    <div className="w-full">
      {/* English Tags Input */}
      <div className="mt-3">
        <div className="flex flex-grow h-14 gap-2 bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 focus-within:border-primary">
          {values.tags.en.map((tag, index) => (
            <div
              key={index}
              className="bg-customOrange-mediumOrange rounded-md px-3 py-1 flex items-center justify-between gap-2"
            >
              <span className="text-15 text-primary mt-1">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index, "en")}
                className="text-red-600 text-xl"
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValueEn}
            onChange={(e) => setInputValueEn(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "en")}
            placeholder="English Tags"
            className="outline-none placeholder:text-14"
          />
        </div>
      </div>
      {/* Arabic Tags Input */}
      <div className="mt-3">
        <div className="flex flex-grow h-14 gap-2 bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 focus-within:border-primary">
          {values.tags.ar.map((tag, index) => (
            <div
              key={index}
              className="bg-customOrange-mediumOrange rounded-md px-3 py-1 flex items-center justify-between gap-2"
            >
              <span className="text-15 text-primary mt-1">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index, "ar")}
                className="text-red-600 text-xl"
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValueAr}
            onChange={(e) => setInputValueAr(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "ar")}
            placeholder="Arabic Tags"
            className="outline-none placeholder:text-14"
          />
        </div>
      </div>
    </div>
  );
};