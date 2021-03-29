export default (base64path, quality = 0.7, callback) => {
    let img = new Image();
    img.src = base64path;
    img.onload = function () {
        // 按比例压缩
        const w = this.width,
            h = this.height;
        //生成canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // 创建属性节点
        const anw = document.createAttribute("width");
        anw.nodeValue = w;
        const anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        /**
         * ctx.drawImage 参数说明
         * http://www.w3school.com.cn/tags/canvas_drawimage.asp
         */
        ctx.drawImage(this, 0, 0, w, h);
        // quality值越小，所绘制出的图像越模糊
        if (quality > 1) {
            quality = 1;
        }
        let base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        typeof callback === "function" && callback(base64);
    }
}