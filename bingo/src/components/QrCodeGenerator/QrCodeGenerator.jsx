import React from "react";
import QRCode from "react-qr-code"; // Correct import for react-qr-code
import styles from "./QrCodeGenerator.module.css";

function QrCodeGenerator() {
  const url = "http://192.168.1.3:3000/mobile"; // Hardcoded URL

  return (
    <div className="qrcode__container">
      <h1 className={styles.txt}>Join with Phone</h1>
      <div className="qrcode__container--parent">
        <div className="qrcode__image">
          <QRCode value={url} size={256} /> {/* Adjust size as needed */}
        </div>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
