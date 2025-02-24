import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      localStorage.setItem("installPrompt", "true"); // Store flag in localStorage
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      localStorage.removeItem("installPrompt"); // Remove flag after install
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", () => setIsInstalled(true));
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Ensure deferredPrompt persists across reloads
    if (localStorage.getItem("installPrompt") === "true") {
      setDeferredPrompt(true);
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    if (deferredPrompt.prompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      }
      setDeferredPrompt(null);
      localStorage.removeItem("installPrompt"); // Cleanup
    }
  };

  return (
    <>
      {!isInstalled && deferredPrompt && (
        <Button
          sx={{
            color: "white",
            bgcolor: "#FF6B6B",
            padding: "8px 12px",
            fontSize: "14px",
            "&:hover": {
              bgcolor: "#D9363E",
            },
          }}
          onClick={handleInstall}
        >
          Install App
        </Button>
      )}
    </>
  );
};

export default InstallButton;