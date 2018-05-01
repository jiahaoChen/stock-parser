var request = require("request");

var options = { method: 'GET',
  url: 'http://www.cmoney.tw/finance/f00060.aspx',
  headers: 
   { 'postman-token': 'c5db1201-8698-58fa-58c9-3c2b4e47660e',
     'cache-control': 'no-cache',
     cookie: 'AspSession=x4qmcttddetg3bjzmm2xzvuu; __auc=2b204b7d1630b1076218f952ebe; _ga=GA1.2.1958369966.1524899018; ASP.NET_SessionId=zo0rnbcgfpkzwfs4silep1wy; __asc=63d920b116311d8805f9e04173b; _gid=GA1.2.1916550325.1525012792',
     'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    //  'accept-encoding': 'gzip, deflate',
     referer: 'http://www.cmoney.tw/finance/f00060.aspx',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
     'upgrade-insecure-requests': '1' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  // console.log(body);
  var matchStr = body.match(/cmkey='(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)'>[\u4e00-\u9fa5]{1,5}/gm);
  console.log(matchStr)
  if (!matchStr)
    throw new Error('No match!')
  var cmkey = ''
  for (let i = 0; i < matchStr.length; ++i) {
    if ( cmkey = matchStr[i].match(/cmkey='(.*)'>三大法人/))
      break;
  }

  console.log(cmkey[1])
});
