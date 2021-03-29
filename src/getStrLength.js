export default val => {
    if (typeof val !== "string") {
        return 0
    };
    let realLength = 0,
        len = val.length,
        charCode = -1;
    while (len--) {
        charCode = val.charCodeAt(len);
        realLength += ((charCode >= 0 && charCode <= 128) ? 1 : 2);
    }
    return realLength;
};