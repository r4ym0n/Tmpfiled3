import superagent from "superagent";
import { ToastContainer, toast } from "react-toastify";


function getApiDomain() {
    switch (process.env.NODE_ENV) {
        case 'production':
            return "https://api.r4y.site/tmpfile";
        case 'development':
            return "http://127.0.0.1:8000/tmpfile"
        default:
            return "http://127.0.0.1:8000/tmpfile"
    }
}


function uploadFileRemote(acceptedFiles) {
    const req = superagent.post(`${getApiDomain()}/upload`)

    var formData = new FormData();
    formData.append("myFile", acceptedFiles[0]);
    // acceptedFiles.forEach(file => {
    //     req.attach("myFile", file)
    // })
    req.send(formData);
    return req;
}

function downloadFileRemoteByFilecode(fileCode, cb) {
    // const req = superagent.get(`${getApiDomain()}/download/${fileCode}`)
    // return req;
    window.open(`${getApiDomain()}/download/${fileCode}`,'_blank')
    cb(fileCode);
}

module.exports = {
    uploadFileRemote,
    downloadFileRemoteByFilecode
}