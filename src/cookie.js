export default (key, value) => {
    let _cookies, isArr = key instanceof Array,
        retArr = {},
        _cookieObj;
    let date = new Date();
    date.setTime(date.getTime() + 259200000); //86400000*3
    //存在value，视为赋值
    if (value || value === "") {
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";path=/;expires=" + date.toGMTString();
        return encodeURIComponent(value);
    } else {
        //没有value视为取值
        _cookies = document.cookie.split(";");
        //key为数组取多个
        if (isArr) {
            _cookieObj = {};
            //cookie To Object
            for (let i in _cookies) {
                let _cookieItem = _cookies[i].split("=");
                _cookieItem[0] = _cookieItem[0].replace(/^( |[\s　])+|( |[\s　])+$/g, "");
                _cookieObj[_cookieItem[0]] = _cookieItem[1];
            }
            //遍历取值
            for (let i in key) {
                retArr[key[i]] = _cookieObj[encodeURIComponent(key[i])];
            }
            return retArr;
        } else {
            //遍历取值
            for (let i in _cookies) {
                let _cookieItem = _cookies[i].split("=");
                _cookieItem[0] = _cookieItem[0].replace(/^( |[\s　])+|( |[\s　])+$/g, "");
                if (_cookieItem[0] == encodeURIComponent(key)) {
                    return decodeURIComponent(_cookieItem[1]);
                }
            }
            return null;
        }
    }
};