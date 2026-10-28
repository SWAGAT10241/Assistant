import React, { useRef } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import AvatarCard from "../components/assistant/AvatarCard";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Alert from "../components/common/Alert";
import useAssistantCustomization from "../hooks/useAssistantCustomization";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";

const PRESET_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
];

/**
 * Assistant Customization View
 * Step 1: Select Preset Avatar or Upload Custom Image
 * Step 2: Name Assistant
 */
export function Customize() {
  const fileInputRef = useRef(null);

  const {
    step,
    setStep,
    assistantName,
    setAssistantName,
    selectedPreset,
    customFile,
    previewUrl,
    activeImage,
    loading,
    errorMessage,
    setErrorMessage,
    handleSelectPreset,
    handleCustomImage,
    goToNextStep,
    goBack,
    saveAssistant,
  } = useAssistantCustomization(PRESET_IMAGES);

  const onFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleCustomImage(file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black via-gray-950 to-[#030353] flex flex-col justify-center items-center p-6 relative">
      {/* Back button */}
      <button
        onClick={goBack}
        className="absolute top-6 left-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Go back"
      >
        <MdKeyboardBackspace className="w-7 h-7" />
      </button>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`h-2 rounded-full transition-all duration-300 ${
            step === 1 ? "w-8 bg-blue-500" : "w-2 bg-white/20"
          }`}
        />
        <span
          className={`h-2 rounded-full transition-all duration-300 ${
            step === 2 ? "w-8 bg-blue-500" : "w-2 bg-white/20"
          }`}
        />
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="w-full max-w-md mb-6">
          <Alert
            variant="error"
            onDismiss={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        </div>
      )}

      {/* STEP 1: Select Image */}
      {step === 1 && (
        <div className="flex flex-col items-center max-w-4xl w-full animate-fadeIn">
          <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-8">
            Select your <span className="text-blue-400">Assistant Image</span>
          </h1>

          <div className="flex justify-center items-center flex-wrap gap-4 max-w-3xl">
            {PRESET_IMAGES.map((img, index) => (
              <AvatarCard
                key={index}
                image={img}
                isSelected={!customFile && selectedPreset === img}
                onSelect={() => handleSelectPreset(img)}
                alt={`Preset avatar ${index + 1}`}
              />
            ))}

            {/* Custom Image Upload Card */}
            <div
              tabIndex={0}
              role="button"
              aria-label="Upload custom assistant image"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
              className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 select-none focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                customFile
                  ? "border-4 border-white shadow-2xl shadow-blue-500/50 scale-105"
                  : "border-2 border-dashed border-blue-900/60 hover:border-white/80"
              }`}
            >
              {customFile && previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Custom Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-2 text-center text-gray-300">
                  <RiImageAddFill className="w-8 h-8 text-blue-400" />
                  <span className="text-xs hidden lg:block">Upload Custom</span>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={onFileInputChange}
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            disabled={!selectedPreset && !customFile}
            onClick={goToNextStep}
            className="mt-10"
          >
            Next: Name Assistant
          </Button>
        </div>
      )}

      {/* STEP 2: Name Assistant */}
      {step === 2 && (
        <div className="flex flex-col items-center max-w-md w-full animate-fadeIn text-center">
          {/* Avatar Preview */}
          {activeImage && (
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-xl shadow-blue-950 mb-6">
              <img
                src={activeImage}
                alt="Selected Avatar Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
            Name your <span className="text-blue-400">Assistant</span>
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            You'll use this name as the wake word when speaking commands.
          </p>

          <Input
            type="text"
            placeholder="e.g. Jarvis, Siri, Friday"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
            required
            className="mb-6"
          />

          <div className="flex items-center gap-4 w-full">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(1)}
              className="w-1/2"
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="lg"
              loading={loading}
              onClick={saveAssistant}
              className="w-1/2"
            >
              Finish Setup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customize;
