import * as xml2json from "./XMLToJson";
/**
 * 往oss上传用的ajax
 *
 * @param      {String}     action      上传地址，默认//cyn-test.oss-cn-hangzhou.aliyuncs.com
 * @param      {String}     filename    默认："file"
 * @param      {File}       file        文件域
 * @param      {Object}     data        参数{
 *                                          key:"保存到oss的文件名",
 *                                          OSSAccessKeyId:"",
 *                                          policy:"",
 *                                          Signature:""
 *                                         }
 * @param      {Function}   onProgress  进度回调
 * @param      {Function}   onError     异常回调
 * @param      {Function}   onSuccess   成功回调
 * @param      {Object}     headers     不解释
 */
function getError(action, xhr) {
    const msg = `fail to post ${action} ${xhr.status}`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
}

function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

export default function (option) {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }

    const xhr = new XMLHttpRequest();
    const action = option.action || '//cyn-test.oss-cn-hangzhou.aliyuncs.com';
    if (typeof option.timeout === "number") {
        xhr.timeout = option.timeout
    }
    if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
        };
    }

    const formData = new FormData();

    if (option.data) {
        Object.keys(option.data).map(key => {
            formData.append(key, option.data[key]);
        });
    }
    formData.append("success_action_status", 201);
    formData.append(option.filename || "file", option.file);


    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            let xml_json;
            try {
                xml_json = xml2json.Create(getBody(xhr));
            } catch (e) { } finally {
                option.onError(getError(action, xhr), xml_json);
            }
            return;
        }
        try {
            let xml_json = xml2json.Create(getBody(xhr)).jsonObj;
            let body_json = {};
            body_json.Bucket = xml_json.PostResponse.Bucket[`text`];
            body_json.ETag = xml_json.PostResponse.ETag[`text`];
            body_json.Key = xml_json.PostResponse.Key[`text`];
            body_json.Location = xml_json.PostResponse.Location[`text`];
            option.onSuccess(body_json);
        } catch (e) {
            option.onSuccess(getBody(xhr));
        }

    };

    xhr.open('post', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    for (let item in headers) {
        if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
        }
    }
    xhr.send(formData);
    return xhr;
}