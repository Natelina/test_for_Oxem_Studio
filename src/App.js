import logo from './logo.svg';
import './App.css';
import Calculator from './components/calculator/Calculator';
import Price from './components/price/Price';

function App() {
  return (
    <div className="container">
      <div className="calculation">Рассчитайте стоимость автомобиля в лизинг</div>
      <Calculator />
    </div>

  );
}

export default App;
