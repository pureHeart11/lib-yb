export default (str) => {
    str = str.replace(/\\n/g, "<br>");
    str = str.replace(/\\r/g, "<br>");
    str = str.replace(/\x20/g, "&nbsp;");
    return str;
};