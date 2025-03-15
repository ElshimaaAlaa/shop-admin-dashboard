"use client"

import { useState } from "react"

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("English")
  const languages = ["Arabic", "English"]

  const handleLanguageSelect = async (lang) => {
    setLanguage(lang)
    setIsOpen(false)

    // Map the language to the corresponding API value
    const langCode = lang === "Arabic" ? "ar" : "en"

    try {
      const response = await fetch('https://demo.vrtex.duckdns.org/api/update-language', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': langCode,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990`,
        },
        body: new URLSearchParams({
          lang: langCode,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Language updated successfully:', data)
    } catch (error) {
      console.error('Error updating language:', error)
    }
  }

  // Globe icon as inline SVG
  const GlobeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  )

  // Check icon as inline SVG
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )

  const DownArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )

  return (
    <div className="flex gap-4">
      <div className="relative z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-22 w-48 text-17 items-center justify-center gap-5  px-3 py-3 bg-gray-100 text-black rounded-lg shadow-sm hover:bg-[#E5A853]/90 transition-colors hover:text-white"
        >
          <GlobeIcon size={22}/>
          <span>{language}</span>
          <DownArrowIcon size={22}/>
        </button>
        {isOpen && (
          <div className="absolute top-full mt-1 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className="flex flex-row-reverse items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                {lang}
                {language === lang && <CheckIcon />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}