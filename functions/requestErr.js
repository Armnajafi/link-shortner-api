module.exports = function (res , stCode = 200, stHeader = "application/x-www-form-urlencoded" , json = { "ok": true }) {
    res.statusCode = stCode;
    res.setHeader('Content-Type', stHeader);
    res.end(JSON.stringify(json));
}
