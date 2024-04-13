// LoginPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Statics.css';
import { v4 as uuidv4 } from 'uuid';
import ReactDatePicker from './SelectDate';


const Static = () => {
    const [data , setData] = useState(null);
    const [totalProfit,setTotalProfit] = useState(null);
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());

    const KEY = 100000;
    let TOTAL_PROFIT = 0;

    let cell = {
        "흰죽":1600,
        "닭죽":1800,
        "호박죽":1800,
        "한우소고기죽":1800,
        "한우소고기미역죽":1900,
        "팥죽":2400,
        "참치김치죽":2450,
        "전복죽":2600,
        "야채죽":1700,
        "소불고기낙지죽":2900,
        "삼계죽":2450,
        "매콤소불고기낙지죽":2900,
        "낙지김치죽":2450,
        "표고버섯죽":2400,
        "참치죽":1900,
        "계란찜":500,
        "메추리알":500,
        "매실차":1670,
        "식혜":1500,
        "오이김치":500
    };

    function calculateProfit(orderData)
    {
        let totalPrice = 0;
        let DPSTAMT = 0;

        DPSTAMT = Number(orderData.DPSTAMT);

        for(let [key , value] of Object.entries(cell))
        {
                 
            let itemList = orderData.ITEMLIST;
            console.log(orderData)
            for(let j = 0; j<itemList.length; j++)
            {
                if(itemList[j].ITEMNAME.includes(key))
                    totalPrice += Number(value);      

                let optionItem = itemList[j].OPTIONLIST;

                for(let k = 0; k < optionItem.length; k++)
                {
                     if(optionItem[k].OPTIONNAME.includes(key))
                    {
                        totalPrice += Number(value);   
                        break;
                    }
                }
            }
    
        }

        let result = DPSTAMT - totalPrice;
        TOTAL_PROFIT += result;
        return result;
    }

    function addCommasToNumber(number) {
        return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }


      const fetchData = async () => {
        try {
             const response = await axios.post('http://localhost:3000',
             {
                startDate,
                endDate
             },{
                 withCredentials: true,
             });
             if(!response)
                 return;

             setData(response.data.ORDER_LIST);

         } catch (error) {
             console.error('Error:', error);
         }
        }
         

      useEffect(() => {
        if (data) {
          setTotalProfit(TOTAL_PROFIT);
        }
      }, [data]);


       // 자식 컴포넌트로부터 전달된 값을 처리하는 함수
    const handleEndDate = (value) => {
        setendDate(value);
    };

     // 자식 컴포넌트로부터 전달된 값을 처리하는 함수
     const handleStartDate = (value) => {
        setstartDate(value);
    };

    const ADVPRODUCT_1 = "BAEMIN_1_PLUS";

  return (
    <div className='static'>
        <div className='title'>
            <h2 className='title-text'>배민</h2>
            <div className='title-date'>
                <ReactDatePicker onValueChange={handleStartDate}></ReactDatePicker>
                <ReactDatePicker onValueChange={handleEndDate}  ></ReactDatePicker>
            </div>  
            <button className='button' onClick={fetchData}>검색</button>
            <div className='nav'>
                <h4 className='orderCount'>
                    <div className='orderCount-text'>
                    주문수 :
                    </div>
                    <h3>{data && data.length}건</h3>
                </h4>
            </div>
            <div className='total-profit'>
                    <h4 className='total-profit-text'>총 순이익 : </h4>
                    <h3>{addCommasToNumber(totalProfit)}원</h3>
                </div>
        </div>
        <div className='content'>
            {data && (
                data.map(item => (
                    <div key={uuidv4()} className='order'>
                        <div className='saler'>
                            <div className='saler-text'>
                                판매점
                            </div>
                            <h2 className='saler-name'>
                                {item.MEMLISTNAME}
                            </h2>
                        </div>
                    <div className='order-content'>
                        <div className='orderType'> {item.ADVPRODUCT == ADVPRODUCT_1 ? '배민1' : '일반 배민'}</div>
                        <div className='orderItem'>
                            {item.ITEMLIST.map((order,idx)=>{
                                return <div key={idx}>
                                    <div className='orderMain'>
                                        {order.ITEMNAME}
                                    </div>
                                   {
                                     order.OPTIONLIST.map((orderOption,idx)=>{
                                        if(orderOption.OPTIONPRICE != 0)
                                        {
                                            return <div key={idx + KEY} className='orderOption'>
                                            {
                                                 '- ' + orderOption.OPTIONNAME + ' ' + '(' + orderOption.OPTIONPRICE + '원)'
                                            } </div>
                                        }
                                    })
                                   }
                                </div>
                            })}
                    
                        </div>
                        <div className='order-price'>
                            <div className='line'></div>
                            <div className='profit'>순수익: {addCommasToNumber(calculateProfit(item))}원</div>
                        </div>
                    </div>
                    </div>
                ))
            )  
            }
        </div>
    </div>
  );
};

export default Static;
