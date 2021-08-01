import React from 'react';
import PokemonList from './Components/PokemonList';
import PokemonDetail from './Components/PokemonDetail';
import PokemonMyList from './Components/PokemonMyList';
import pokemonLogo from './pokemon-logo.png';
import './Components/CSS/style.css';


class App extends React.Component {

  state = {
    page: 1,
    pokemonNumber: 0,
    pokemonNickname: '',
  };

  onSubmitDetailPageNumber = (detailNumber, page) => {
    this.setState({ pokemonNumber: detailNumber, page: page, pokemonNickname: '' });
  }

  onSubmitDetailPageNickname = (detailNumber, detailNickname, page) => {
    this.setState({ page: page, pokemonNumber: detailNumber, pokemonNickname: detailNickname });
  }

  handleNavigation = (navigationType) => {
    switch (navigationType) {
      case 'owned': 
        this.setState({page: 3});
        break;
      default: 
        this.setState({page: 1});
        break;
    }
  }

  render() {
    let pageState;
    switch (this.state.page) {
      case 2:
        pageState = <PokemonDetail onSubmit={this.onSubmitDetailPageNumber} detailNickname={this.state.pokemonNickname} detailNumber={this.state.pokemonNumber} />
        break;
      case 3:
        pageState = <PokemonMyList onSubmit={this.onSubmitDetailPageNickname} detailNumber={this.state.pokemonNumber} />
        break;
      default:
        pageState = <PokemonList onSubmit={this.onSubmitDetailPageNumber} />;
        break;
    }
    return (
      <div className="container">
        <div className="navbar">
          <div className="nav-logo">
            <img src={pokemonLogo} className="pokemon-logo" alt="logo" width="125px" height="50px" />
          </div>
          <div className="nav-options">
            <div onClick={() => this.handleNavigation('all')}>All list</div>
            <div onClick={() => this.handleNavigation('owned')}>My collection</div>
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
