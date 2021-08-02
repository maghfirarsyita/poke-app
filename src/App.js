import React from 'react';
import PokemonList from './Components/PokemonList';
import PokemonDetail from './Components/PokemonDetail';
import PokemonMyList from './Components/PokemonMyList';
import pokemonLogo from './pokemon-logo.png';
import './Components/CSS/style.css';


class App extends React.Component {

  state = {
    page: 'list',
    pokemonNumber: 0,
    pokemonNickname: '',
  };

  onSubmitPageConfig = (detailNumber, detailNickname, page) => {
    this.setState({ page: page, pokemonNumber: detailNumber, pokemonNickname: detailNickname });
  }

  handleNavigation = (navigationType) => {
    this.setState({ page: navigationType });
  }

  render() {
    let pageState;
    switch (this.state.page) {
      case 'detail':
        pageState = <PokemonDetail onSubmit={this.onSubmitPageConfig} detailNickname={this.state.pokemonNickname} detailNumber={this.state.pokemonNumber} />
        break;
      case 'my-list':
        pageState = <PokemonMyList onSubmit={this.onSubmitPageConfig} detailNumber={this.state.pokemonNumber} />
        break;
      default:
        pageState = <PokemonList onSubmit={this.onSubmitPageConfig} />;
        break;
    }
    return (
      <div className="container">
        <div className="navbar">
          <div className="nav-logo">
            <img src={pokemonLogo} className="pokemon-logo" alt="logo" width="125px" height="50px" data-testid="pokemon-logo" />
          </div>
          <div className="nav-options">
            <div role="navigation" onClick={() => this.handleNavigation('list')}>All list</div>
            <div role="navigation" onClick={() => this.handleNavigation('my-list')}>My collection</div>
          </div>
        </div>
        <div className="body">
          {pageState}
        </div>
      </div>
    );
  }
}

export default App;
