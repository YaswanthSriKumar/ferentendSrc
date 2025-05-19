import React, { useEffect, useState } from "react";

const SlidePopup = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Choose the background color based on the "type" prop.
  const backgroundColor =
    type === "success" ? "green" : type === "error" ? "red" : "gray";

  useEffect(() => {
    // Total animation time: 4.5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  // Inline style for the popup element. Notice the constant centering.
  const popupStyle = {
    position: "fixed",
    left: "50%",
    top: "-100px", // starting off-screen (above the viewport)
    transform: "translateX(-50%)", // keeps the element centered horizontally
    backgroundColor,
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "4px",
    zIndex: 9999,
    animation: "slideInOut 4.5s forwards"
  };

  return (
    <>
      {/* Define keyframes for the animation using inline CSS */}
      <style>
        {`
          @keyframes slideInOut {
            0% {
              top: -100px;
              opacity: 0;
            }
            16.67% {
              top: 20px;
              opacity: 1;
            }
            83.33% {
              top: 20px;
              opacity: 1;
            }
            100% {
              top: -100px;
              opacity: 0;
            }
          }
        `}
      </style>
      <div style={popupStyle}>
        {message}
      </div>
    </>
  );
};

export default SlidePopup;
