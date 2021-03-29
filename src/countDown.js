const _turn_seconds = (key, op) => {
    let return_value = {
        h: 0,
        m: 0,
        s: 0
    };
    key = key - 0;
    if (key < 0) {
        return return_value;
    }
    return_value.h = parseInt(key / (60 * 60));
    return_value.m = parseInt(key / 60) % 60;
    return_value.s = key % 60;
    return return_value;
};
export default op => {
    let _setInterval, _time_leftover, _temp;
    let _op = Object.assign({
        start: 60,
        step: 1000,
        endCallBack: function() {}
    }, op);
    _time_leftover = _turn_seconds(_op.start, _op);
    console.warn(_time_leftover);
    typeof _op.processCallBack === "function" && _op.processCallBack(_time_leftover);
    _setInterval = setInterval(function() {
        _op.start--;
        _time_leftover = _turn_seconds(_op.start);
        typeof _op.processCallBack === "function" && _op.processCallBack(_time_leftover);
        if (_op.start <= 0) {
            clearInterval(_setInterval);
            typeof _op.endCallBack === "function" && _op.endCallBack();
        }
    }, _op.step);
    return _setInterval;
};