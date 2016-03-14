
function getMd(url) {
    url = url || ""
    
    if (XMLHttp) {
        XMLHttp.onreadystatechange = function() {
            if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200) {
                    var s = XMLHttp.responseText.indexOf("<article")
                    var e = XMLHttp.responseText.indexOf("</article>")
                    document.getElementById("section_article").innerHTML = XMLHttp.responseText.slice(s, e + 10);
                }
            }
        }
        XMLHttp.open("GET", url, true);
        XMLHttp.send(null);
    }
}

function get(params) {
    var url = "https://github.com/Pythians/Pythians.github.io/blob/master/README.md";
    // url = "blogs/introducation.md"
    getMd(url);
}