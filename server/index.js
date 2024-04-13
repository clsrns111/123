const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http-server');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));  

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/login',(req,res)=>{
    console.log(res);
})

app.post('/', (req, res) => {

  let date = req.body;
  const startDate = date.startDate.substring(0, 10).replace(/-/g, '');
  const endDate = date.endDate.substring(0, 10).replace(/-/g, '');

  console.log(startDate)
  console.log(endDate)

  data.STARTDATE = startDate;
  data.ENDDATE = endDate;

    //배민
fetch(DOMAIN + baemin_saleManage, {
  method: "POST",
  headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization":  token, // 토큰 추가
  },
  body: JSON.stringify(data),
})

.then(response => {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('-------------------------배민-------------------------')
  let orderData = data.data;
  res.send(orderData);

  //앱주문결제금액합계
  // let totalSales = orderData.APPPAYAMT;

  // for(let order of orderData.ORDER_LIST)
  // {
  //   let PAYMENTMETHOD = order.PAYMENTMETHOD;
  //   let firstOrderItem = order.ITEMLIST[0];
  //   let menuName = order.ITEMNAME;

  //     if(!menu[menuName]) 
  //       menu[menuName] = {};

  //     if(!menu[menuName].PAYAMT) 
  //       menu[menuName].PAYAMT = 0;
  //     else 
  //       menu[menuName].PAYAMT += order.PAYAMT;
  // }
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
}); 


});

app.get('http://localhost:8080', (req, res) => {
  const data = req.body; // body-parser를 통해 파싱된 데이터
  console.log('111');
//   //배민
// fetch(DOMAIN + baemin_saleManage, {
//   method: "POST",
//   headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//       "Authorization":  token, // 토큰 추가
//   },
//   body: JSON.stringify(data),
// })
// .then(response => {
//   if (!response.ok) {
//       throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('-------------------------배민-------------------------')
//   let orderData = data.data;

//   //앱주문결제금액합계
//   // let totalSales = orderData.APPPAYAMT;

//   // for(let order of orderData.ORDER_LIST)
//   // {
//   //   let PAYMENTMETHOD = order.PAYMENTMETHOD;
//   //   let firstOrderItem = order.ITEMLIST[0];
//   //   let menuName = order.ITEMNAME;

//   //     if(!menu[menuName]) 
//   //       menu[menuName] = {};

//   //     if(!menu[menuName].PAYAMT) 
//   //       menu[menuName].PAYAMT = 0;
//   //     else 
//   //       menu[menuName].PAYAMT += order.PAYAMT;
//   // }
// })
// .catch(error => {
//   console.error('There was a problem with the fetch operation:', error);
// }); 

});

//user info
const userId_bamin_coupang = process.env.USERID_BAMIN_COUPANG;
const userId_yogiyo = process.env.USERID_YOGIYO;
const userPassword = process.env.USERPASSWORD;

//password encoding
const EncKey =	process.env.ENCkEY;
const EncIV =	process.env.ENCIV;
const token = process.env.TOKEN; // 토큰 값

const key = Buffer.from(EncKey, 'utf8');
const iv = Buffer.from(EncIV, 'utf8');
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let ecordedPassword = cipher.update(userPassword, 'utf8', 'base64');
ecordedPassword += cipher.final('base64');

const DOMAIN = 'https://datahub-dev.scraping.co.kr/';
const baemin_saleManage = "scrap/deliveryapp/baemin/salesManagement"; //배민 매출관리
const yogiyo_saleMange = 'scrap/deliveryapp/yogiyo/salesManagement';
const coupang_saleMange = 'scrap/deliveryapp/coupangeats/salesManagement';

let menu = {};

let data = { 
  LOGINID: userId_bamin_coupang,
  LOGINPWD: ecordedPassword,
  STARTDATE: '20240404',
  ENDDATE: '20240404',
 }; 

 let data2 = { 
  LOGINID: userId_yogiyo,
  LOGINPWD: ecordedPassword,
  STARTDATE: '20240404',
  ENDDATE: '20240404',
 }; 


// //요기요
// let yogiyo =fetch(DOMAIN + yogiyo_saleMange, {
//   method: "POST",
//   headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//       "Authorization":  token, // 토큰 추가
//   },
//   body: JSON.stringify(data2),
// })
// .then(response => {
//   if (!response.ok) {
//       throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('-------------------------요기요-------------------------')
// })
// .catch(error => {
//   console.error('There was a problem with the fetch operation:', error);
// }); 

// //쿠팡
// let coupang = fetch(DOMAIN + coupang_saleMange, {
//   method: "POST",
//   headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//       "Authorization":  token, // 토큰 추가
//   },
//   body: JSON.stringify(data),
// })
// .then(response => {
//   if (!response.ok) {
//       throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('------------------------쿠팡----------------------')
// })
// .catch(error => {
//   console.error('There was a problem with the fetch operation:', error);
// });

