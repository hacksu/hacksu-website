declare("sendgridSubscribe", (email) => {
  return new Promise(function(resolve, reject) {
    var auth = {
      'Authorization': 'Bearer ' + CONFIG.sendgrid.apikey,
      'Content-Type': 'application/json',
    }
    request({
      url: "https://api.sendgrid.com/v3/contactdb/recipients",
      method: "POST",
      headers: auth,
      body: [{
        "email": email,
      }],
    }).then(res => {
      return res.json();
    }).then(data => {
      var id = data.persisted_recipients[0];
      request({
        url: "https://api.sendgrid.com/v3/contactdb/lists/972378/recipients/" + id,
        method: "POST",
        headers: auth,
        body: [{
          "email": email,
        }],
      }).then(res2 => {
        return res2.json();
      }).then(data2 => {
        console.log(data2);
        resolve(true);
      }).catch(err => {
        log("error", "SendGrid Subscribe", err);
      })
    }).catch(err => {
      log("error", "SendGrid Subscribe", err);
    })
  })
})

log.white(chalk.green("+") + " SENDGRID OPERATIONAL ");
