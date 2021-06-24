import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { PopulationTable } from './features/population/populationTable';
import './App.css';

function App() {
  // const getPop = async () => {
  //   const r = await fetch('https://api.github.com/users/hacktivist123/repos')
  //   .then((response) => response.json());
  //   return r
  // }
  // console.log(getPop());
  return (
    <div className="App">
      <header className="App-header">
        
        {/* <Counter /> */}
        <PopulationTable />
        
      </header>
    </div>
  );
}

export default App;
