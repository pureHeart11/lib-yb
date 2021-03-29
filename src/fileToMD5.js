import md5 from "md5";
export default (file, callback) => {
  let reader = new FileReader();
  reader.readAsArrayBuffer(file.files[0]);
  reader.addEventListener("load", function (e) {
    var res = e.target.result;

    var md5Info = md5(res);
    typeof callback === "function" && callback(md5Info, reader);

  });
};