import { encode, decode } from './base64';
import _base64ToBlob from './base64ToBlob'
import _cookie from './cookie';
import _countDown from "./countDown";
import _dealImage from './dealImage';
import * as emoji from './emoji';
import _file_to_base64 from './fileToBase64';
import _fileToMD5 from "./fileToMD5";
import _getStrLength from './getStrLength';
import _getSuffixName from './getSuffixName';
import _imgLoad from './imgLoad';
import * as _local_storage from './localStorage';
import _OSSAjax from './OSSAjax'
import _queryString from './queryString';
import * as _session_storage from './sessionStorage';
import _turn_time from './turnTime';
import { Create } from './XMLToJson';
import invisible_ascii_to_html from './invisibleAsciiToHtml'
import './FormatDate';
import _loadScript from "./loadScript"
const _export = {
    base64: {
        encode, decode,
        toBlob: _base64ToBlob
    },
    cookie: _cookie,
    countDown: _countDown,
    dealImage: _dealImage,
    emoji,
    fileToBase64: _file_to_base64,
    fileToMD5: _fileToMD5,
    getStrLength: _getStrLength,
    getSuffixName: _getSuffixName,
    imgLoad: _imgLoad,
    loadScript: _loadScript,
    localStorage: _local_storage,
    OSSAjax: _OSSAjax,
    queryString: _queryString,
    sessionStorage: _session_storage,
    turnTime: _turn_time,
    XMLToJson: Create,
    invisibleAsciiToHtml: invisible_ascii_to_html
};

export default _export;