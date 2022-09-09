import { useRef, useState, useEffect, useCallback } from "react";
// import MyDropzone from "./myDropzone";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";

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
    upbtnEl.current.style.left = iconX - 115 + "px";
    upbtnEl.current.style.top = iconY + 115 + "px";
    upbtnEl.current.style.display = "none";
    // console.log(iconX, iconY);
  }
  useEffect(() => {
    window.addEventListener("resize", repositionUpButton, false);
    // // 移动拖着不放事件
    // document.addEventListener("dragover", function (e) {
    //   console.log("拖着不放事件！");
    //   e.preventDefault();
    // });
    // // 移动拖着放下事件s
    // document.addEventListener("drop", function (e) {
    //   console.log("拖着放下事件!");
    //   e.preventDefault();
    // });
  }, []);

  useEffect(() => {
    repositionUpButton();
  }, [iconEl.current]);

  function MyDropzone(props) {


    const onDrop = useCallback((acceptedFiles) => {
      function onDrop(acceptedFiles) {
        const req = request.post('/upload')
        acceptedFiles.forEach(file => {
          req.attach(file.name, file)
        })
        req.end(callback)
      }
      console.log(acceptedFiles)
    }, []);

    const onDropAccepted = useCallback((acceptedFiles) => {
      console.log("acceptedFiles")
      // console.log(...getRootProps())
      console.log(acceptedFiles)
      }, []);


    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
      onDrop
      ,onDropAccepted,
      maxFiles:1,
      maxSize:50000000,
      multiple:false
    });

    const files = acceptedFiles.map(file => <li key={file.path}>      {file.path} - {file.size} bytes</li>);


    return (
      <div {...getRootProps()} className={styles.myDropCard}>
        <input {...getInputProps()} />
        <section className={styles.myDropCard}>

            <h3>Chose file</h3>
            {/* <button type="button" className="btn btn-primary">Select...</button> */}
            <div
              className={styles.uploadIconWp}
              // onClick={() => {
              //   inputEl.current.click();
              // }}
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
                        <ul>{files}</ul>

                {/* <input
                  ref={inputEl}
                  type="file"
                  hidden
                  onChange={(e) => {
                    Setfilename(e.target.files[0].name);
                    upbtnEl.current.style.display = "block";
                  }}
                /> */}
              </div>
            </div>

            <div className={styles.uploadFooter}>
              
                {isDragActive ? (
                  <p><b style={{ color: "blue" }}>Drop</b> the files here ...</p>
                ) : (
                  <p><b style={{ color: "blue" }}>Drag 'n' drop</b> some files here.👆</p>
                )}
            </div>
            <button
              type="button"
              className={[styles.button, styles.uploadButton].join("")}
              ref={upbtnEl}
            >
              Upload
            </button>
          
        </section>
      </div>
    );
  }

  return (
    <div href="#" className={[styles.card, styles.uploadBox].join(" ")}>
      <MyDropzone />
    </div>
  );
}
