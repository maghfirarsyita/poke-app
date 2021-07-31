import React from 'react';
import './App.css';
import PokemonList from './Components/PokemonList';
import PokemonDetail from './Components/PokemonDetail';
import PokemonMyList from './Components/PokemonMyList';
import './Components/CSS/style.css';
import pokemonLogo from './pokemon-logo.png';

class App extends React.Component {

  state = {
    page: 1,
    pokemonNumber: 0,
  };

  onSubmitDetailPageNumber = (detailNumber, page) => {
    this.setState({ pokemonNumber: detailNumber, page: page });
  }

  render() {
    let pageState;
    switch (this.state.page) {
      case 2:
        pageState = <PokemonDetail onSubmit={this.onSubmitDetailPageNumber} detailNumber={this.state.pokemonNumber} />
        break;
      case 3:
        pageState = <PokemonMyList onSubmit={this.onSubmitDetailPageNumber} detailNumber={this.state.pokemonNumber} />
        break;
      default:
        pageState = <PokemonList onSubmit={this.onSubmitDetailPageNumber} />;
        break;
    }
    return (
      <div className="container">
        <div className="navbar"><img src={pokemonLogo} className="pokemon-logo" alt="logo" /></div>
        {pageState}
      </div>
    );
  }
}

export default App;
