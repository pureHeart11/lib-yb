export default (fileName) => {
    if (typeof fileName === "string") {
        var point = fileName.lastIndexOf(".");
        return fileName.substr(point + 1).toLocaleLowerCase();
    }
    return "";
};