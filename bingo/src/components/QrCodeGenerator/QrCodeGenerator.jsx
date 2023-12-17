import React from "react";
import QRCode from "react-qr-code"; // Correct import for react-qr-code
import styles from "./QrCodeGenerator.module.css";

function QrCodeGenerator({ isInactive }) {
  const url = "http://192.168.1.3:3000/mobile"; // Hardcoded URL

  return (
    <div
      className={`${styles.qrcodeContainer} ${
        isInactive ? styles.inctiveQrcodeContainer : ""
      } `}
    >
      <h1 className={styles.txt}>Join with Phone</h1>
      <div className={styles.qrcodeContainerParent}>
        <div className={styles.qrcodeImage}>
          <QRCode value={url} size={256} /> {/* Adjust size as needed */}
        </div>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
