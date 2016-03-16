
function getMd(url) {
    url = url || ""

    if (XMLHttp) {
        XMLHttp.onreadystatechange = function() {
            if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200) {
                    var md = window.markdownit();
                    var result = md.render(XMLHttp.responseText);
                    document.getElementById("main_article").innerHTML = result;
                }
            }
        }
        XMLHttp.open("GET", url, true);
        XMLHttp.send(null);
    }
}

function get(params) {
    var url;
    url = "blogs/introducation.md"
    getMd(url);
}
