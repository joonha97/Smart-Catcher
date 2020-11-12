var express = require('express');
var app = express();
fs = require('fs');
i=0

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'proj_0'
})
connection.connect();

function doit() {
        obj = {};
        obj.gocome = Math.round(Math.random()) * 2 - 1;//0~1

        var query = connection.query('insert into K set ?', obj, function(err,                                             rows, cols) {
                if (err) throw err;
                console.log("database insertion ok= %j", obj);
        });

        console.log(`i=${i}`)
        //if (i++ > 10) return//limit
        //setTimeout(doit, 2000)//2 sec
        //setTimeout(doit, Math.random() * 1000);//0~1 sec
        setTimeout(doit, Math.random() * 600000);//0~10 min
}
//doit()

app.get('/', function(req, res) {
  doit();
  res.end('Loyola Library......Nice to meet you');
});
/*
app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./graph_0.html', function (err, html) {
    html = " "+ html
    console.log('read file');

    var qstr = 'select * from K ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = "";
      for (var i=0; i< rows.length; i++) {
         r = rows[i];
         data += comma + "[new Date(2017,04-1,"+ r.id +",00,38),"+ r.gocome +"]                                            ";
         comma = ",";
      }
//      var header = "data.addColumn('date', 'Date/Time');"
      var header = " ";
//      header += "data.addColumn('number', 'Temp');"
//      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%HEADER%>", "hello header..?");
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})
*/
app.get("/data", function(req, res) {
  console.log("param=" + req.query);

  var qstr = 'select * from K ';
  connection.query(qstr, function(err, rows, cols) {
    if (err) {
      throw err;
      res.send('query error: '+ qstr);
      return;
    }

    console.log("Got "+ rows.length +" records");
    html = ""
    for (var i=0; i< rows.length; i++) {
       html += JSON.stringify(rows[i]);
    }
    res.send(html);
  });

});

/*
app.get('/log', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remote                                            Address);
  res.end('OK:' + JSON.stringify(req.query));
});
*/

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
