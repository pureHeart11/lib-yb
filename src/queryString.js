const _getVal = val => {
    let _ret, re;
    let uri = window.location.href;
    re = new RegExp("" + val + "\=([^\&\?]*)", "gi");
    _ret = uri.match(re);
    return ((uri.match(re)) ? decodeURIComponent(uri.match(re)[0].substr(val.length + 1).split("#")[0]) : null);
};
export default val => {
    /*获取单个url参数*/
    if (val.constructor == String) {
        return _getVal(val);
    }
    /*批量获取url参数*/
    //queryString的参数为对象时返回对象
    if (val.constructor == Object) {
        let ival
        for (let i in val) {
            if (val.hasOwnProperty(i)) {
                ival = _getVal(i);
                if (ival) {
                    val[i] = ival;
                }
            }
        }
        return val;
    }
    //queryString参数为数组是返回数组
    if (val.constructor == Array) {
        let i = val.length;
        while (i--) {
            val[i] = _getVal(val[i]);
        }
        return val;
    }
    return null;
};