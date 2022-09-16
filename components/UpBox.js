import { useRef, useState, useEffect, useCallback } from "react";
// import MyDropzone from "./myDropzone";
import Dropzone from "react-dropzone";
import superagent from "superagent";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { uploadFileRemote } from "../apis/tmpfile-api";

import styles from "./style.module.css";

export default function UpBox(prop) {
  function MyDropzone(props) {
    const inputEl = useRef(null);
    const iconEl = useRef(null);
    const upbtnEl = useRef(null);

    const [dpzDisabled, setdpzDisabled] = useState(false);
    const [fileAccepted, setFileAccepted] = useState(false);

    function repositionUpButton() {
      const iconX = iconEl.current.x;
      const iconY = iconEl.current.y;

      // setButtonGroupShow(false);
      console.log(iconX, iconY);
    }
    useEffect(() => {
      // repositionUpButton();
      // window.addEventListener("resize", repositionUpButton, false);
    }, []);

    const onDrop = useCallback((acceptedFiles) => {}, []);

    const onDropAccepted = useCallback((acceptedFiles) => {
      console.log(acceptedFiles);
      toast.info("File accepted! Click upload", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFileAccepted(true);
      // setButtonGroupShow(true);
      // setdpzDisabled(true);
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
        disabled: fileAccepted,
      });

    // const files = acceptedFiles.map((file) => (
    //   <li key={file.path}>
    //     <p>
    //       {file.path} - {file.size} bytes
    //     </p>
    //   </li>
    // ));

    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        <p>
          {file.path} - {file.size} bytes
        </p>
      </li>
    ));

    const onUploadClick = (e) => {
      const req = uploadFileRemote(acceptedFiles);
      
      toast.info("uploading...");
      req.on("progress", (event) => {
        console.log(event);
        /* event的值：
        {
          direction: "upload" or "download"
          percent: 0 to 100 // 如果文件大小未知，可能会没有
          total: // 总文件大小，可能没有
          loaded: // 到目前为止下载或上传的字节数
        } */
      });
      req.end((err, res) => {
        if (err) {
          console.log(err);
          toast.error(`Upload failed: ${err}`);
        } else {
          console.log(res.body);
          toast.success(`Upload successful`);
        }
      });
    };

    const onClearClick = (e) => {
      acceptedFiles = [];
      setFileAccepted(false);
      toast.info("Operation cancelled");
    };

    function DpzFooter(props) {
      if (fileAccepted) {
        return (
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
        );
      } else {
        return (
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
        );
      }
    }

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
                {fileAccepted == false ? (
                  <p>Select ...</p>
                ) : (
                  <ul style={{ margin: 0 }}>{files}</ul>
                )}
              </div>
            </div>

            <DpzFooter />
          </section>
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
