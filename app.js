const fs = require('fs'),
      express = require('express'),
      app = new express(),
      path = require('path'),
      requestIp = require('request-ip');

// This value can be changed depending on how many requests are made within a single request and the response time of the server.
var requestTime = 250;
var infractionsMax = 5;
var simtime_calc = [];

function diff (num1, num2) {
    if (num1 > num2) {
        return num1 - num2
    } else {
        return num2 - num1
    }
}

app.use(requestIp.mw());
app.use(function(req, res, next) {
    // Ignore the request entirely if they are inside the blacklist.
    if(fs.existsSync('./ddos-filtered.cache')){
        if(fs.readFileSync('./ddos-filtered.cache').toString().includes(req.clientIp)){
            return;
        }
    }

    // Get current time and set the time to a object of the request ip.
    var cur_sim_time = new Date().getTime();
    if(simtime_calc[req.clientIp] === undefined || simtime_calc[req.clientIp] === null || simtime_calc[req.clientIp] === ""){
        simtime_calc[req.clientIp] = {
            cur_time: cur_sim_time,
            infractions: 0
        }
    }

    // Get new date instead of last date above.
    // Compare it against the request time and the old date time. 
    var date = new Date().getTime();
    if(diff(simtime_calc[req.clientIp].cur_time, date) < requestTime){
        var newvar = parseInt(simtime_calc[req.clientIp].infractions) + 1;
        // When the ip exceeds max infractions blacklist them then remove them from the array.
        // Also logs them to the ./ddos-filtered.cache file.
        if(newvar >= infractionsMax){
            if(!fs.existsSync('./ddos-filtered.cache')){
                fs.writeFileSync('./ddos-filtered.cache', '', function(er) {
                    
                })
            }
            if(!fs.readFileSync('./ddos-filtered.cache').toString().includes(req.clientIp))
                fs.appendFileSync('./ddos-filtered.cache', req.clientIp+"\n",function(err) {

                });

            delete simtime_calc[req.clientIp];
            return;
        }
        // Set the infractions to the new value if the request was made below the time calculated. And reset the date
        simtime_calc[req.clientIp].infractions = newvar;
        simtime_calc[req.clientIp].cur_time = date;
    }else{
        // Every time a new request is made set the date to the new date.
        simtime_calc[req.clientIp].cur_time = date;    
    }

    next();
});

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname)});
});

app.listen(80);
