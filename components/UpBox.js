import { useRef, useState, useEffect } from "react";
import { Dropzone } from "dropzone";


import styles from "./style.module.css";

export default function UpBox() {
  const inputEl = useRef(null);
  const iconEl = useRef(null);
  const upbtnEl = useRef(null);
  const [filename, Setfilename] = useState("");
  const [upbtnPosX, setupbtnPosX] = useState(0);
  const [upbtnPosY, setupbtnPosY] = useState(0);

  function repositionUpButton() {
    const iconX = iconEl.current.x;
    const iconY = iconEl.current.y;
    upbtnEl.current.style.left = iconX - 115 + "px";
    upbtnEl.current.style.top = iconY + 115 + "px";
    // upbtnEl.current.style.display = "none";
    console.log(iconX, iconY);
  }
  useEffect(() => {
    repositionUpButton();
    window.addEventListener("resize", repositionUpButton, false);

    // 移动拖着不放事件
    document.addEventListener("dragover", function (e) {
      console.log("拖着不放事件！");
      e.preventDefault();
    });
    // 移动拖着放下事件s
    document.addEventListener("drop", function (e) {
      console.log("拖着放下事件!");
      e.preventDefault();
    });
  }, []);

  return (
    <div href="#" className={[styles.card, styles.uploadBox].join(" ")}
    onDrop={
        (e) => {
            console.log(e);
            console.log(e.dataTransfer.files)
            inputEl.current.files = e.dataTransfer.files;
        }
    }
    >
      <h3>Chose file</h3>
      {/* <button type="button" className="btn btn-primary">Select...</button> */}
      <div
        className={styles.uploadIconWp}
        onClick={() => {
          inputEl.current.click();
        }}
      >
        <div>
          <img
            src="/file2-64.png"
            ref={iconEl}
            alt="Upload"
            className={styles.uploadIcon}
          ></img>
          {/* <Image src={uploadIcon} alt="Upload" className="upload-icon" /> */}
          {filename === "" ? <p>Select ...</p> : <p>{filename}</p>}
          <input
            ref={inputEl}
            type="file"
            hidden
            onChange={(e) => {
              Setfilename(e.target.files[0].name);
              upbtnEl.current.style.display = "block";
            }}
          />
        </div>
      </div>
      <button
        type="button"
        className={[styles.button, styles.uploadButton].join("")}
        ref={upbtnEl}
      >
        Upload
      </button>

      <div className={styles.uploadFooter}>
        <p>Or, Draw your file here. 👆</p>
      </div>
    </div>
  );
}
