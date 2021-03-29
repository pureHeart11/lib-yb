const init = Symbol('init');
const cursor = Symbol('cursor');
const jsonObj = Symbol('jsonObj');
const next = Symbol('next');
const readNode = Symbol('readNode');
const readTag = Symbol('readTag');
const readText = Symbol('readText');
const transEntities = str => str
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, '\'');
const addChildren = (parent, child) => {
    for (let k in child) {
        if (parent[k]) {
            if (!(parent[k] instanceof Array)) {
                parent[k] = [parent[k]];
            }
            parent[k].push(child[k]);
        } else {
            parent[k] = child[k];
        }
    }
}
class XML {
    constructor(xmlstr) {
        this.xmlstr = xmlstr;
        this[cursor] = -1;
        this[jsonObj] = {};
    }
    get jsonObj() {
        this[init]();
        return this[jsonObj];
    }
    [init]() {
        this[cursor] = -1;
        this[jsonObj] = {};
        this[cursor] = this.xmlstr.indexOf('?>');
        if (this.xmlstr.indexOf('<!DOCTYPE') > -1) {
            this[cursor] = this.xmlstr.indexOf(']>') + 2;
        }
        this[next]();
        Object.assign(this[jsonObj], this[readNode]());
    }
    [next]() {
        const index = this.xmlstr.indexOf('<', this[cursor]);
        this[cursor] = this.xmlstr.indexOf('<![CDATA[', index) === 0 ? this[cursor] : index + 1;
    }
    [readTag](tag) {
        const nodeName = tag.split(/\s+/)[0],
            nodeAttr = {},
            patt = /([^\s]+)=(['"])([^"']+?)(\2)|([^\s]+)=([^\s"']+)/g;
        let result = null;
        while ((result = patt.exec(tag)) !== null) {
            if (result[1]) {
                nodeAttr['@' + result[1]] = transEntities(result[3]);
            } else if (result[5]) {
                nodeAttr['@' + result[5]] = transEntities(result[6]);
            }
        }
        return {
            nodeName,
            nodeAttr
        };
    }
    [readText](nodeName) {
        let text = '',
            start = this[cursor],
            end = this.xmlstr.indexOf('</' + nodeName + '>', start),
            cdStart = -1,
            cdEnd;
        if (end < 0) return text;
        while ((cdStart = this.xmlstr.indexOf('<![CDATA[', start)) > -1 && cdStart < end) {
            text += transEntities(this.xmlstr.substring(start, cdStart));
            cdEnd = this.xmlstr.indexOf(']]>', cdStart);
            text += this.xmlstr.substring(cdStart + 9, cdEnd);
            start = cdEnd + 3;
            end = this.xmlstr.indexOf('</' + nodeName + '>', start);
        }
        text += transEntities(this.xmlstr.substring(start, end));
        this[cursor] = end + nodeName.length + 3; //'</'.length + '>'.length = 3
        return text;
    }
    [readNode]() {
        const node = {},
            nextTest = /^[\s\n]*<(?!\/|!\[CDATA\[)/,
            openTagStop = this.xmlstr.indexOf('>', this[cursor]),
            { nodeAttr, nodeName } = this[readTag](this.xmlstr.substring(this[cursor], openTagStop));

        Object.assign(node, nodeAttr);
        let parent = {
            [nodeName]: node
        };
        this[cursor] = openTagStop + 1;


        if (nextTest.test(this.xmlstr.substring(this[cursor], this[cursor] + 1024))) {
            this[next]();
            Object.assign(node, this[readNode]());
        }


        let text = this[readText](nodeName);
        if (text && !/^\s+$/.test(text)) {
            node['text'] = text
        };


        if (nextTest.test(this.xmlstr.substring(this[cursor], this[cursor] + 1024))) {
            this[next]();
            addChildren(parent, this[readNode]());
        }
        return parent;
    }
}
export const Create = function (xmlstr="") { 
    return new XML(xmlstr);
}