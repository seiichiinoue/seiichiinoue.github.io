// prepare submit data
// need to deal with all case of url !!
var tmp = document.URL.replace("https://seiichiinoue.github.io/post/", "");
var name = tmp.replace("/", "");
if (name == "") name = "noname";
var res;

// request
var request = new XMLHttpRequest();
request.open('GET', 'https://recomapp.herokuapp.com/infer?name='+name, true)
request.responseType = 'json';

// request.onreadystatechange = function () {
//     if (request.readyState != 4) {
//         // pass
//     } else if (request.status != 200) {
//         // result = null
//     } else {
//         res = request.response;
//     }
// };

request.onload = function() {
    res = request.response;
    // generate html
    var names = res["similar_doc_name"];
    var titles = res["similar_doc_title"];
    var len = 3;
    if (len > names.length) len = names.length;
    var html = "<ul>";
    for (i=0; i<len; ++i) {
        var tmp = "";
        tmp += "<li>";
        tmp += "<a";
        tmp += ' href="https://seiichiinoue.github.io/post/';
        tmp += names[i];
        tmp += '/">';
        tmp += titles[i];
        tmp += "</a>";
        tmp += "</li>";
        // console.log(tmp);
        html += tmp;
        html += "\n";
    }
    html += "</ul>";

    // insert generated html if success request
    if (res["success"]) {
        document.getElementById("related").insertAdjacentHTML('afterend',html);
    }
}

request.send();
