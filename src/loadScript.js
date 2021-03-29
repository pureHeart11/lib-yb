var cache = {};

export default function loadScript(url) {
  if (cache[url]) return cache[url];
  else {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    document.body.appendChild(script);
    cache[url] = new Promise(function (resolve, reject) {
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        reject();
      };
    });
    return cache[url];
  }
}
