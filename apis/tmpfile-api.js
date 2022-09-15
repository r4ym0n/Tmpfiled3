import superagent from "superagent";
import { ToastContainer, toast } from "react-toastify";


function getApiDomain() {
    switch (process.env.NODE_ENV) {
        case 'production':
            return "https://api.r4y.site/tmpfile";
        case 'development':
            return "http://127.0.0.1:8000/tmpfile"
        default:
            return "http://127.0.0.1:3000/tmpfile"
    }
}


function uploadFileRemote(acceptedFiles) {
    const req = superagent.post(`${getApiDomain()}/upload`)
    acceptedFiles.forEach(file => {
        req.attach("myFile", file)
    })
    req.on('progress', event => {
        console.log(event)
        /* event的值：
        {
          direction: "upload" or "download"
          percent: 0 to 100 // 如果文件大小未知，可能会没有
          total: // 总文件大小，可能没有
          loaded: // 到目前为止下载或上传的字节数
        } */
    })
    req.end((err, res) => {
      if (err) {
        console.log(err);
        toast.error(`Upload failed: ${err}`);
      } else {
        console.log(res.body);
        toast.success(`Upload successful: ${res.body}`);
      }
    })
}

function downloadFileRemoteByFilecode(fileCode) {
    const req = superagent.get(`${getApiDomain()}/download/${fileCode}`)
    req.end((err, res) => {
      if (err) {
        console.log(err);
        toast.error(`Download failed: ${err}`);
        } else {
            console.log(res.body);
            toast.success(`Download successful: ${res.body}`);
            }
            })
}

module.exports = {
    uploadFileRemote,
    downloadFileRemoteByFilecode
}