import { useEffect, useState } from "react";
import ButtonLink from "./ButtonLink";
import { Button } from "@mui/material";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Prevent the default install prompt
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }
    setDeferredPrompt(null);
  };

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
  }, []);

  return (
    <>
      {!isInstalled && deferredPrompt && (

        // <ButtonLink btnText="Install App"  onClick={handleInstall} />
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
        // <button onClick={handleInstall} style={styles.button}>
        //   Install App
        // </button>
      )}
    </>
  );
};

const styles = {
  button: {
    background: '#317EFB',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: 'clamp(12px, 14px, 16px)', // Responsive font size
    width: '100%', // Full width on smaller screens
    maxWidth: '200px', // Prevents button from being too large
  },
  // button: {
  //   background: "#317EFB",
  //   color: "#fff",
  //   padding: "10px 20px",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  //   fontSize: "16px",
  // },
};

export default InstallButton;
