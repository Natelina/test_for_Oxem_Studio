import React, { useEffect, useRef, useState } from 'react';
import s from './Price.module.css';

function Price(props) {
  const { priceCar, downPayment, leaseTerm, procRef, paymentRef, vznosRef, disabled, setDisabled } = props;
  const interestRate = 0.035;// процентная ставка
  const monthlyPaymentRef = useRef(null);
  const sumLiasingRef = useRef();
  console.log('disabled', disabled);
  const disBtn = disabled ? `${s.button} ${s.disabledButton}` : s.button;
  const disablebtn = !!disabled;
  monthlyPaymentRef.current = Math.trunc((priceCar.range - (downPayment.range / 100)) * ((interestRate * (1 + interestRate) ** leaseTerm.range) / ((1 + interestRate) ** leaseTerm.range - 1)));

  sumLiasingRef.current = (vznosRef) + +(leaseTerm.range) * monthlyPaymentRef.current;

  const sendData = async () => {
    console.log('click');
    const response = await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(sumLiasingRef.current, monthlyPaymentRef.current),
    });
    setDisabled(true);
    return response;
  };

  return (
    <div className={s.sum}>
      <div className={s.twoSum}>
        <div className={s.amountDeal}>
          <div className={s.itemName}>Cумма договора лизинга</div>
          {(vznosRef && leaseTerm.range && monthlyPaymentRef.current)
            ? <div className={s.sumDoc1}>{`${sumLiasingRef.current} ₽`}</div> : <div className={s.sumDoc1}>0 ₽</div>}
        </div>
        <div className={s.monthlyPayment}>
          <div className={s.itemName}>Eжемесячный платеж</div>
          {(priceCar.range && downPayment.range && leaseTerm.range)
            ? <div className={s.sumDoc2}>{`${monthlyPaymentRef.current} ₽`}</div> : <div className={s.sumDoc2}>0 ₽</div>}
        </div>
      </div>
      <div className={s.btn}>

        <button
          onClick={sendData}
          className={disBtn}
          type="button"
          name="button"
          disabled={disablebtn}
        >
          <p className={s.textSend}>Оставить заявку</p>
        </button>
      </div>
    </div>
  );
}

export default Price;
