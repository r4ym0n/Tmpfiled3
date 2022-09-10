import { useRef, useState, useEffect, useCallback } from "react";
// import MyDropzone from "./myDropzone";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import styles from "./style.module.css";

export default function UpBox(prop) {
  const inputEl = useRef(null);
  const iconEl = useRef(null);
  const upbtnEl = useRef(null);
  const [filename, Setfilename] = useState("");
  const [upbtnPosX, setupbtnPosX] = useState(0);
  const [upbtnPosY, setupbtnPosY] = useState(0);

  function repositionUpButton() {
    const iconX = iconEl.current.x;
    const iconY = iconEl.current.y;
    upbtnEl.current.style.left = iconX + "px";
    upbtnEl.current.style.top = iconY + "px";
    // upbtnEl.current.style.display = "none";
    console.log(iconX, iconY);
    console.log(upbtnEl.current.style.display);
  }
  useEffect(() => {
    repositionUpButton();
    window.addEventListener("resize", repositionUpButton, false);
  }, []);

  function MyDropzone(props) {
    const onDrop = useCallback((acceptedFiles) => {
      function onDrop(acceptedFiles) {
        const req = request.post("/upload");
        acceptedFiles.forEach((file) => {
          req.attach(file.name, file);
        });
        req.end(callback);
      }
      console.log(acceptedFiles);
    }, []);

    const onDropAccepted = useCallback((acceptedFiles) => {
      console.log("acceptedFiles");
      // console.log(...getRootProps())
      console.log(acceptedFiles);
      toast.info("Fsile accepted! Click upload", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      upbtnEl.current.style.display = "block";
    }, []);

    const onError = useCallback((err) => {
      console.log(err);
      toast.warn("Invaild file!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
      useDropzone({
        onError,
        onDrop,
        onDropAccepted,
        maxFiles: 1,
        maxSize: 50000000,
        multiple: false,
      });

    
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {" "}
        {file.path} - {file.size} bytes
      </li>
    ));


    const onUploadClick = (e) => {
      console.log(1231);
      toast.info("uploading...");
    };
  
    const onClearClick = (e) => {
      console.log(1232);
      upbtnEl.current.style.display = "none";
      acceptedFiles = [];
      toast.warn("Cancel...");
    };
  
    return (
      <div className={styles.myDropCard}>
        <div {...getRootProps()} className={styles.myDropCard}>
          <input {...getInputProps()} />
          <section className={styles.myDropCard}>
            <h3>Chose file</h3>
            {/* <button type="button" className="btn btn-primary">Select...</button> */}
            <div className={styles.uploadIconWp}>
              <div>
                <img
                  src="/file2-64.png"
                  ref={iconEl}
                  alt="Upload"
                  className={styles.uploadIcon}
                ></img>
                {filename === "" ? <p>Select ...</p> : <p>{filename}</p>}
                <ul>{files}</ul>
              </div>
            </div>
            <div className={styles.uploadFooter}>
              {isDragActive ? (
                <p>
                  <b style={{ color: "blue" }}>Drop</b> the files here ...
                </p>
              ) : (
                <p>
                  <b style={{ color: "blue" }}>Drag 'n' drop</b> some files
                  here.👆
                </p>
              )}
            </div>
          </section>
        </div>
        <div ref={upbtnEl} className={styles.btnUpGroup}>
          <span>
            <button
              type="button"
              className={[
                styles.button,
                styles.btnUpGroup,
                styles.uploadButton,
              ].join(" ")}
              onClick={onUploadClick}
            >
              Upload
            </button>
            <button
              type="button"
              className={[
                styles.button,
                styles.btnUpGroup,
                styles.clearButton,
              ].join(" ")}
              onClick={onClearClick}
            >
              🚮
            </button>
          </span>
        </div>
      </div>
    );
  }


  return (
    <div className={[styles.card, styles.uploadBox].join(" ")}>
      <MyDropzone />
    </div>
  );
}
