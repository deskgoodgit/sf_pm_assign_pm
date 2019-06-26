var fs = require('fs');
var HttpsProxyAgent = require('https-proxy-agent');
var agent = new HttpsProxyAgent('http://10.10.19.226:8080');
var http = require("https");


//Read CSV and Convert to Array
var csvText = fs.readFileSync('E:/ExtStaging/PMSCreateForm/pending/data.csv', 'utf8');
var csvData = new Array();
var csvRow = csvText.split(/\r?\n|\r/);
for( i = 1 ; i < csvRow.length; i++)
	{
	csvData.push(csvRow[i].split(','));
	}

	
//API Call to create form	
for( i = 0 ; i < csvData.length-1; i++)
{
var options = {
  "method": "GET",
  "hostname": "api10preview.sapsf.com",
  "port": null,
  "path": "/odata/v2/createPerformanceReviewForm?formSubjectId='"+csvData[i][0]+"'&formTemplateId="+csvData[i][1]+"L&sendEmail=true&enRouteCopy=false",
  "headers": {
    "authorization": "Basic ",
    "cache-control": "no-cache",
    "postman-token": "e0d766ee-95f9-ea20-a908-b05923a6ab07"	
  },
  "agent":agent
};
var req = http.request(options, function (res) {
  var chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
req.end();
}

