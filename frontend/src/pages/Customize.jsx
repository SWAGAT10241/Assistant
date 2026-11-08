import React, { useRef } from "react";
import { ArrowLeft, ImagePlus, Sparkles, Check } from "lucide-react";
import { StringTilt, StringMagnetic, StringSpotlight } from "@fiddle-digital/string-tune";
import AvatarCard from "../components/assistant/AvatarCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Alert from "../components/common/Alert";
import useAssistantCustomization from "../hooks/useAssistantCustomization";
import useStringTune from "../hooks/useStringTune";
import { cn } from "../lib/utils";

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
 * Assistant Customization View powered by shadcn/ui.
 * Step 1: Select Preset Avatar or Upload Custom Image
 * Step 2: Name Assistant
 */
export function Customize() {
  const fileInputRef = useRef(null);

  // Initialize StringTune modular animations for the customization wizard
  useStringTune([StringTilt, StringMagnetic, StringSpotlight]);

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
    <div className="w-full min-h-screen bg-gradient-to-t from-background via-gray-950 to-[#030353] flex flex-col justify-center items-center p-6 relative select-none">
      {/* Back button using shadcn Button */}
      <Button
        variant="ghost"
        size="icon"
        string="magnetic"
        string-magnetic-strength="0.3"
        onClick={goBack}
        className="absolute top-6 left-6 rounded-full text-muted-foreground hover:text-foreground h-11 w-11"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      {/* Step Indicator using shadcn Badges */}
      <div className="flex items-center gap-3 mb-6">
        <Badge
          variant={step === 1 ? "default" : "outline"}
          className="px-3 py-1 gap-1.5 transition-all"
        >
          {step > 1 ? <Check className="w-3.5 h-3.5" /> : <span>1</span>}
          <span>Avatar</span>
        </Badge>
        <div className="w-6 h-px bg-border/60" />
        <Badge
          variant={step === 2 ? "default" : "outline"}
          className="px-3 py-1 gap-1.5 transition-all"
        >
          <span>2</span>
          <span>Wake Word</span>
        </Badge>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="w-full max-w-md mb-6 animate-in fade-in-50 duration-200">
          <Alert variant="error" onDismiss={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        </div>
      )}

      {/* STEP 1: Select Image */}
      {step === 1 && (
        <div className="flex flex-col items-center max-w-4xl w-full animate-in fade-in duration-300">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-foreground text-3xl sm:text-4xl font-extrabold tracking-tight">
              Select your <span className="text-primary">Assistant Image</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Choose a visual identity for your personal AI assistant or upload your own portrait.
            </p>
          </div>

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

            {/* Custom Image Upload Card using shadcn Card styling */}
            <Card
              tabIndex={0}
              role="button"
              string="tilt"
              string-tilt-max="12"
              aria-label="Upload custom assistant image"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
              className={cn(
                "w-[75px] h-[145px] lg:w-[150px] lg:h-[250px] overflow-hidden cursor-pointer flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 select-none p-0 border-2",
                customFile
                  ? "border-primary shadow-xl shadow-primary/30 ring-2 ring-primary scale-105 bg-primary/10"
                  : "border-dashed border-border/70 hover:border-primary/80 bg-card/40"
              )}
            >
              {customFile && previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Custom Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-2 text-center text-muted-foreground group-hover:text-foreground">
                  <ImagePlus className="w-8 h-8 text-primary" />
                  <span className="text-xs font-medium hidden lg:block">Upload Custom</span>
                </div>
              )}
            </Card>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={onFileInputChange}
            />
          </div>

          <Button
            string="magnetic"
            string-magnetic-strength="0.3"
            variant="default"
            size="lg"
            disabled={!selectedPreset && !customFile}
            onClick={goToNextStep}
            className="mt-10 px-10 h-12 rounded-xl font-semibold shadow-lg shadow-primary/20"
          >
            Next: Name Assistant
          </Button>
        </div>
      )}

      {/* STEP 2: Name Assistant */}
      {step === 2 && (
        <Card className="max-w-md w-full animate-in fade-in zoom-in-95 duration-300 border-border/80 bg-card/85 backdrop-blur-2xl text-center shadow-2xl">
          <CardHeader className="flex flex-col items-center pb-4">
            {/* Avatar Preview */}
            {activeImage && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-xl shadow-primary/25 mb-4 ring-4 ring-primary/20">
                <img
                  src={activeImage}
                  alt="Selected Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <CardTitle className="text-2xl font-bold">
              Name your <span className="text-primary">Assistant</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              You'll use this name as the wake word when speaking commands.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="e.g. Jarvis, Siri, Friday"
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
              required
              className="text-center font-medium h-12 text-base"
              autoFocus
            />
          </CardContent>

          <CardFooter className="flex items-center gap-3 pt-2">
            <Button
              string="magnetic"
              string-magnetic-strength="0.3"
              variant="outline"
              size="lg"
              onClick={() => setStep(1)}
              className="w-1/2 rounded-xl"
            >
              Back
            </Button>

            <Button
              string="magnetic"
              string-magnetic-strength="0.3"
              variant="default"
              size="lg"
              loading={loading}
              onClick={saveAssistant}
              disabled={!assistantName.trim()}
              className="w-1/2 rounded-xl font-semibold shadow-lg shadow-primary/20 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Finish Setup
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default Customize;
