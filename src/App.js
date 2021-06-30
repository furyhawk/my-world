import { useState } from 'react'
import './App.css';
import { Pokemon, PokemonCountStat } from './features/pokemon/Pokemon'

const pokemon = ['bulbasaur', 'pikachu', 'ditto', 'bulbasaur']

function App() {
  // const getPop = async () => {
  //   const r = await fetch('https://api.github.com/users/hacktivist123/repos')
  //   .then((response) => response.json());
  //   return r
  // }
  // console.log(getPop());
  const [pollingInterval, setPollingInterval] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <PokemonCountStat />
        {/* <select
          onChange={(change) => setPollingInterval(Number(change.target.value))}
        >
          <option value={0}>Off</option>
          <option value={1000}>1s</option>
          <option value={5000}>5s</option>
        </select>
        {pokemon.map((poke, index) => (
          <Pokemon key={index} name={poke} pollingInterval={pollingInterval} />
        ))} */}

      </header>
    </div>
  );
}

export default App;
