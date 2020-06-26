var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var receiverEmailAddress = 'ichihara.yusuke.17@shizuoka.ac.jp'
var senderEmailAddress = 'zz.freedom.uver1y@gmail.com'
var senderEmailPassword = 'zldsfrzbhhcjdvrz'

router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/', function(req, res, next) {
  let name = "名前：" + req.body.name + "\n";
  let email = "メールアドレス：" + req.body.email + "\n";
  let tel = "電話番号：" + req.body.tel + "\n";
  let type = "問合せ種別：" + req.body.type + "\n";
  let message = "メッセージ：" + req.body.message;
  let content = name + email + tel + type + message;
  console.log(content);

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: senderEmailAddress,
      pass: senderEmailPassword
    }
  });
  var mailOptions1 = {
    from: senderEmailAddress,
    to: receiverEmailAddress,
    subject: "ポートフォリオサイト案件「" + type + "」",
    text: content
  };
  transporter.sendMail(mailOptions1, function (error, info) {
    if (error) {
      console.log(error);
      res.render('contact', {msg: "送信できませんでした。"});
    } else {
      console.log('Email sent: ' + info.response);
      res.render('contact', {msg: "送信成功しました。"});
    }
    smtp.close();
  });
});

module.exports = router;