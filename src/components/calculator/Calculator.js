import React, { useRef, useState } from 'react';
import Price from '../price/Price';
import s from './Calculator.module.css';
import r from './Range.module.css';

function Calculator() {
  const [priceCar, setPriceCar] = useState({});// сумма авто
  const [downPayment, setDwnPayment] = useState({});// первоначальный взнос
  const [leaseTerm, setLeaseTerm] = useState({});// срок лизинга
  const [stylesPriceCar, setStylesPriceCar] = useState();// меняла стиль полосы
  const [stylesDownPayment, setStylesDownPayment] = useState();// меняла стиль полосы
  const [stylesLeaseTerm, setStylesLeaseTerm] = useState();// меняла стиль полосы
  const [disabled, setDisabled] = useState(false);

  const vznosRef = useRef(null);

  const disabledInput1 = disabled ? `${s.carCard1} ${s.disCard}` : s.carCard1;
  const disabledInput2 = disabled ? `${s.carCard2} ${s.disCard}` : s.carCard2;
  const disabledInput3 = disabled ? `${s.carCard3} ${s.disCard}` : s.carCard3;

  const disableInpit = !!disabled;

  const colorInputsPriceCar = priceCar.range ? `${s.inputPrice} ${s.colorInp}` : s.inputPrice;
  const colorInputsDownPayment = downPayment.range ? `${s.inputPrice} ${s.colorInp}` : s.inputPrice;
  const colorInputsriceLeaseTerm = leaseTerm.range ? `${s.inputPrice} ${s.colorInp}` : s.inputPrice;

  vznosRef.current = (priceCar.range * downPayment.range) / 100;

  console.log('stylesDownPayment', stylesDownPayment);

  const priceCarHandler = (e) => {
    setPriceCar((prev) => ({ ...prev, [e.target.name]: (e.target.value).slice(0, 7) }));
    setStylesPriceCar(Math.trunc(((priceCar.range - 1000000) * 100) / 6000000));
  };

  const downPaymentHandler = (e) => {
    if (priceCar.range < 1000000) setPriceCar({ [e.target.name]: 1000000 });
    if (priceCar.range > 6000000) setPriceCar({ [e.target.name]: 6000000 });
    setDwnPayment((prev) => ({ ...prev, [e.target.name]: (e.target.value).slice(0, 2) }));
    setStylesDownPayment(Math.trunc(((downPayment.range - 10) * 100) / 60));
  };

  const leaseTermHandler = (e) => {
    setLeaseTerm((prev) => ({ ...prev, [e.target.name]: (e.target.value).slice(0, 2) }));
    setStylesLeaseTerm(Math.trunc(((leaseTerm.range - 1) * 100) / 60));
  };

  return (
    <>
      <div className={s.calculator}>
        <div className={disabledInput1}>
          <div className={s.itemName}>Стоимость автомобиля</div>
          <div className={s.wrapper}>
            <input
              onChange={priceCarHandler}
              value={priceCar.range}
              className={colorInputsPriceCar}
              name="range"
              type="number"
              min="1000000"
              max="6000000"
              autoComplete="off"
              disabled={disableInpit}
            />
            <input
              onChange={priceCarHandler}
              value={priceCar.range}
              className={r.range}
              name="range"
              type="range"
              min="1000000"
              max="6000000"
              step="1"
              style={{ background: `-webkit-linear-gradient(left, #FF9514 0%, #FF9514 ${stylesPriceCar}%, #fff ${stylesPriceCar + 20}%,#fff 100%)` }}
              disabled={disableInpit}
            />
            <div className={s.rub}>₽</div>
            <div className={s.progress} />
          </div>
        </div>
        <div className={disabledInput2}>
          <div className={s.itemName}>Первоначальный взнос</div>
          <div className={s.wrapper}>
            <input
              value={vznosRef.current}
              className={colorInputsDownPayment}
              type="number"
              name="range"
              disabled
            />
            <input
              onChange={downPaymentHandler}
              value={downPayment.range}
              className={r.range}
              name="range"
              type="range"
              min="10"
              max="60"
              step="1"
              style={{ background: `-webkit-linear-gradient(left, #FF9514 10%, #FF9514 ${stylesDownPayment}%, #fff ${stylesDownPayment + 15}%,#fff 60%)` }}
              disabled={disableInpit}
            />
            <input
              onChange={downPaymentHandler}
              value={downPayment.range}
              className={s.procent}
              name="range"
              type="number"
              min="10"
              max="60"
              step="1"
              autoComplete="off"
              disabled={disableInpit}
            />
            <div className={s.proc}>%</div>
          </div>
        </div>

        <div className={disabledInput3}>
          <div className={s.itemName}>Срок лизинга</div>
          <div className={s.wrapper}>
            <input
              onChange={leaseTermHandler}
              value={leaseTerm.range}
              className={colorInputsriceLeaseTerm}
              name="range"
              type="number"
              min="1"
              max="60"
              autoComplete="off"
              disabled={disableInpit}
            />

            <input
              onChange={leaseTermHandler}
              value={leaseTerm.range}
              className={r.range}
              type="range"
              name="range"
              min="1"
              max="60"
              step="1"
              style={{ background: `-webkit-linear-gradient(left, #FF9514 1%, #FF9514 ${stylesLeaseTerm}%, #fff ${stylesLeaseTerm}%,#fff 60%)` }}
              disabled={disableInpit}
            />
            <div className={s.proc}>мес.</div>
          </div>
        </div>
      </div>
      <Price disabled={disabled} setDisabled={setDisabled} downPayment={downPayment} leaseTerm={leaseTerm} priceCar={priceCar} vznosRef={vznosRef.current} />
    </>
  );
}

export default Calculator;
