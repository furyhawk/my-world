import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { PokemonCountStat } from './features/pokemon/Pokemon'

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" component={PokemonCountStat} />
      </Switch>
    </Router>
  );
}

export default App;
