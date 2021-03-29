export default (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = function(e) {
        typeof callback === "function" && callback(this.result, reader);
    }
};