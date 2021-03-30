// Shopping Cart 구현해보기 by 생활코딩

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

var products = {      // DB 대용
  1:{title:'The history of web 1'},
  2:{title: 'The next web'}
};

app.get('/products', function(req, res) {
  var output = '';
  for(var name in products) {
    output += `
    <li>
      <a href="/cart/${name}">${products[name].title}</a>
    </li>`
  }
  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});
/*
cart = {
  /cart/1/으로 접속했다면
  1(제품의 id번호):1(제품 하나가 카트에 담겼다=제품의 수량), -> 웹브라우저에는 이러한 형태로 저장이 된다.
  /cart/2로 접속했다면
  2:1
}
*/
app.get('/cart/:id', function(req, res) {     // :id -> 파라미터를 얻을 수 있다.
  var id = req.params.id;
  // signedCookies: cookie를 암호화
  if(req.cookies.cart) {                  // cart라는 값이 이미 setting되어 있다면
    var cart = req.cookies.cart;          // 사용자(브라우저)가 전송할 테니까 그대로 사용
    //var cart = req.signedCookies.cart;  
  } else {                                // cart라는 값이 없다면
    var cart = {};                        // cart라는 변수에 객체를 담아준다.
  }
  if(!cart[id]) {                         // cart의 id값이 존재하지 않는다면
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id]) + 1;      // cart[id] : cookie를 통해 전달된 값은 기본적으로 문자열로 전달되기 때문에 int화 시켜줘야함
  // 비어있다면 비어있는 cart라는 객체가 cookie로 setting이 되는 것이다.
  res.cookie('cart', cart);               // cart라는 이름으로 cart라는 비어있는 변수를 브라우저에 심는다(생성한다)
  //res.cookie('cart', cart, {signed:true});       // signed:true -> cookie를 저장할 때 암호화해서 저장한다라는 뜻
  res.redirect('/cart');
});

app.get('/cart', function(req, res) {
  var cart = req.cookies.cart;
  //var cart = req.signedCookies.cart;
  if(!cart){                              // cart값이 없다면
    res.send('Empty!');
  } else {                                // cart값이 존재한다면
    var output = '';
    for(var id in cart) { 
      // 상품 수량 증가시키기
      output += `<li>${products[id].title} (${cart[id]})</li>`;
    }
  }
  res.send(`
  <h1>Cart</h1>
  <ul>${output}</ul>
  <a href="/products">Products List</a>`);
});

app.listen(3000, function() {
  console.log('Connect 3000 port!');
});