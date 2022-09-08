import { useRef } from "react";
import styles from "./style.module.css"
export default function DwnBox() {

  const inputEl = useRef(null);
  
  return (
    <div className={[styles.card, styles.cardHover].join(" ")}
    onClick={e=>{
        if (e.target.tagName === "BUTTON") return;
        inputEl.current.focus();
      }}>
      <a href="#" className={styles.a}>
        <h3>Fetch File &darr;</h3>
        <p style={{ fontSize: "medium" }}>
          If you Have a <code className={styles.code}>FileCode</code>, Paste it below.
        </p>
        <span className={styles.codeBox}>
          <input
            placeholder="code"
            className={styles.inputCode}
            type="text"
            maxLength="8"
            ref={inputEl}
          ></input>
          <button type="button" className={[styles.btn, styles.btnDownload].join(" ")} id="code-input"
          >
            {/* <img src="/download-48.png"></img> */}
          </button>
        </span>
      </a>

      <style jsx>
        {`
         
        `}
      </style>
    </div>
  );
}
