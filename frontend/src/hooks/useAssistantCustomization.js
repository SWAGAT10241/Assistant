import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

/**
 * Custom hook to encapsulate the multi-step Assistant Customization logic
 */
export function useAssistantCustomization(presetImages = []) {
  const { user, updateAssistantProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [assistantName, setAssistantName] = useState(
    user?.assistantName || "Siri"
  );
  const [selectedPreset, setSelectedPreset] = useState(
    user?.assistantImage || presetImages[0] || null
  );
  const [customFile, setCustomFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const objectUrlRef = useRef(null);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  /**
   * Handle selecting one of the preset avatars
   */
  const handleSelectPreset = useCallback((imageSrc) => {
    setSelectedPreset(imageSrc);
    setCustomFile(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreviewUrl(null);
    setErrorMessage("");
  }, []);

  /**
   * Handle picking a custom image from the device
   */
  const handleCustomImage = useCallback((file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image file size must be less than 5MB.");
      return;
    }

    // Revoke previous URL if any
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const newUrl = URL.createObjectURL(file);
    objectUrlRef.current = newUrl;

    setCustomFile(file);
    setPreviewUrl(newUrl);
    setSelectedPreset(null);
    setErrorMessage("");
  }, []);

  /**
   * Navigate forward to step 2 or validate current step
   */
  const goToNextStep = useCallback(() => {
    if (!customFile && !selectedPreset) {
      setErrorMessage("Please select or upload an avatar for your assistant.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  }, [customFile, selectedPreset]);

  /**
   * Navigate back to previous step or home
   */
  const goBack = useCallback(() => {
    if (step === 2) {
      setStep(1);
      setErrorMessage("");
    } else {
      navigate("/");
    }
  }, [step, navigate]);

  /**
   * Final submission to update assistant name and avatar
   */
  const saveAssistant = useCallback(async () => {
    const trimmedName = assistantName.trim();
    if (!trimmedName) {
      setErrorMessage("Please give your assistant a name.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await updateAssistantProfile({
        assistantName: trimmedName,
        file: customFile,
        imageUrl: customFile ? null : selectedPreset,
      });

      navigate("/");
    } catch (err) {
      setErrorMessage(
        err.message || "Failed to update assistant settings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [assistantName, customFile, selectedPreset, updateAssistantProfile, navigate]);

  // Active display image for previews
  const activeImage = customFile ? previewUrl : selectedPreset || user?.assistantImage;

  return {
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
  };
}

export default useAssistantCustomization;

