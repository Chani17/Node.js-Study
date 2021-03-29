var express = require('express');
var cookieParser = require('cookie-parser');      // cookie-parser 모듈을 변수에 담는다 
var app = express();

// cookieParser()
// cookie정보를 가지고 있는 요청이 들어오면 cookieParser가 해석해서 
// req나 res 객체를 통해 cookie 관련 작업을 할 수 있도록 해주는 라이브러리
app.use(cookieParser());
app.get('/count', function(req, res) {
  if(req.cookies.count) {    // req.cookies.count : 웹브라우저가 웹서버에게 전송한(웹브라우저가 요청한) 쿠키의 값
    var count = parseInt(req.cookies.count);       // cookie의 값은 문자열이기 때문에 int로 변환 
  } else {
    var count = 0;          // 쿠키의 값이 없다면 0으로 초기화
  }
  count = count + 1;

  // 웹서버에서 웹브라우저에 응답할 때 count값을 설정해서 웹브라우저에게 보내도록 한다
  res.cookie('count', count);
  res.send('count : ' + count);   
});
app.listen(3000, function(){
  console.log('Connected 3000 port!!!');
});