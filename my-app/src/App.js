import logo from './logo.svg';
import './App.css';
// import Greetings from './components/Greetings';
// import Welcome from './components/Welcome';
// import Counter from './components/Counter';
// import Form from './components/form';
import Form2 from './components/form2';
import Header from './components/Header';
import Inventory from './components/inventory';
import Total_revenue from './components/Total_Profit';
import QuantityEdit from './components/QuantityEdit';

function App() {
  return (
    <div className="App">
      {/* <Header></Header>
      <Form2></Form2>
      <Inventory></Inventory>
      <Total_revenue></Total_revenue> */}
      <QuantityEdit></QuantityEdit>
    </div>
  );
}

export default App;
