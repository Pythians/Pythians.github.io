
function getMd(url) {
    url = url || ""

    if (XMLHttp) {
        XMLHttp.onreadystatechange = function() {
            if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200) {
                    setArticle(mdToHtml(XMLHttp.responseText));
                }
            }
        }
        XMLHttp.open("GET", url, true);
        XMLHttp.send(null);
    }
}

function mdToHtml(str) {
    var md = window.markdownit();
    return md.render(str)
}

function setArticle(str) {
    document.getElementById("main_article").innerHTML = str
}

function getLocalMd(url) {
    if ('string' === typeof(url)) {
        getMd(url);
    }else{
        var str = '# welcome to my personal page  \n---  \nI am a game devlopment  \nVery *happy* to meet **you**';
        setArticle(mdToHtml(str))
    }

}
