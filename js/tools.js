// GET URL
function getWithUrl(url,callback) {
    if (!url) {
        return
    }

    if (XMLHttp) {
        XMLHttp.onreadystatechange = function() {
            if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200) {
                    callback(XMLHttp.responseText);
                }
            }
        }
        XMLHttp.open("GET", url, true);
        XMLHttp.send(null);
    }
}

// 将 md 文件内容转换为 HTML 代码
function mdToHtml(str) {
    var md = window.markdownit();   // 转换工具
    return md.render(str)           // 转换
}

// 把 HTML 代码插入到文档中的article
function setArticle(str) {
    document.getElementById("main_article").innerHTML = str
}


function getLocalMd(url) {
    if ('string' === typeof (url)) {
        getWithUrl(url,function (str) {
            setArticle(mdToHtml(str));
        });
    } else {
        var str = '# welcome to my personal page  \n---  \nI am a game devlopment   \n```\n#include <stdio.h>\nint i=1;\n```\n  \nVery *happy* to meet **you**';
        setArticle(mdToHtml(str))
    }

}

// 高亮代码
function highlightCode() {
    var pres = document.getElementsByTagName('pre')     // 找到所有代码块
    for (var i = 0; i < pres.length; i++) {
        var element = pres[i];
        element.className += 'prettyprint'              // 添加 className
    }
    prettyPrint();                                      // 高亮代码
}