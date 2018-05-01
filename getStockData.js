var request = require("request");

var options = { method: 'POST',
  url: 'http://www.cmoney.tw/finance/ashx/mainpage.ashx',
  headers: 
   { 'postman-token': '0da6dfd4-9875-e7f3-50d9-a5ad4f13e524',
     'cache-control': 'no-cache',
     cookie: 'AspSession=x4qmcttddetg3bjzmm2xzvuu; __auc=2b204b7d1630b1076218f952ebe; _ga=GA1.2.1958369966.1524899018; _gid=GA1.2.740556572.1524899018; __asc=c1e3ebc11630b3efa483c4bbf51; _gat_UA-30929682-1=1; _gat_UA-30929682-32=1; _gat_UA-30929682-4=1; AspSession=x4qmcttddetg3bjzmm2xzvuu; __auc=2b204b7d1630b1076218f952ebe; _ga=GA1.2.1958369966.1524899018; _gid=GA1.2.740556572.1524899018; __asc=c1e3ebc11630b3efa483c4bbf51',
     'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
     'accept-encoding': 'gzip, deflate',
     referer: 'http://www.cmoney.tw/finance/f00060.aspx?o=1',
     'content-type': 'application/x-www-form-urlencoded',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
     'x-requested-with': 'XMLHttpRequest',
     'x-devtools-emulate-network-conditions-client-id': 'BC475E73E3A6D3F7BD37C2C980FD418',
     origin: 'http://www.cmoney.tw',
     accept: 'application/json, text/javascript, */*; q=0.01' },
  form: { 
    action: 'GetInstitutionalInvestorsTmxOpenInterest', 
    cmkey: '4W5do7FYe6v5p46asPMkug==', 
    commKey: 'TX' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
