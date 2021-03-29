export default (m) => {
    var retObj = {};
    //日
    retObj.d = parseInt(m / 1000 / 60 / 60 / 24);
    //时
    retObj.h = parseInt(m % (1000 * 60 * 60 * 24) / 1000 / 60 / 60);
    //分
    retObj.m = parseInt(m % (1000 * 60 * 60) / 1000 / 60);
    //秒
    retObj.s = parseInt(m % (1000 * 60) / 1000);
    //豪秒
    retObj.millisecond = parseInt(m % 1000);
    return retObj;
};