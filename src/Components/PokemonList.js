import React from 'react';
import pokemon from './API/poke_api';

class PokemonList extends React.Component {
    state = {
        ownedTotal: 0,
        pokemonList: [],
        urlApi: 'https://pokeapi.co/api/v2/pokemon',
        totalList: 50,
    };

    fetchPokemonList = async (totalLimit) => {
        const response = await pokemon.get('/api/v2/pokemon', {
            params: {
                limit: totalLimit,
            }
        });
        this.setState({
            pokemonList: response.data.results,
        });
        this.checkOwnedTotal();
    }

    checkOwnedTotal() {
        const ownedPokemonList = localStorage.getItem('myPokemon');
        const myPokemon = ownedPokemonList ? JSON.parse(ownedPokemonList) : [];
        const total = myPokemon.length;
        this.setState({
            ownedTotal: total,
        })
    }

    componentDidMount() {
        this.fetchPokemonList(this.state.totalList);
    }

    handleDetail(pokemon) {
        const pokemonUrl = pokemon.split('/')[6];
        this.props.onSubmit(pokemonUrl, 2);
    }

    handleCheckList() {
        this.props.onSubmit(0, 3);
    }

    handleRestart() {
        localStorage.setItem('myPokemon', []);
    }

    handleLoadMore() {
        const newTotalList = this.state.totalList + 50;
        this.setState({
            totalList: newTotalList,
        })
        this.fetchPokemonList(newTotalList);
    }

    render() {
        const { pokemonList, ownedTotal } = this.state;
        return (
            <div className="pokemon-list-page">
                <div className="owned-section">
                    Owned: {ownedTotal}
                </div>
                {/* <div onClick={() => this.handleRestart()}>Restart</div> */}
                <div className="pokemon-list">
                    {
                        pokemonList.map((pokemon, index) => {
                            return (
                                <div className="pokemon-section" key={'pokemon-list' + index}>
                                    <div className="pokeball" onClick={() => this.handleDetail(pokemon.url)}>
                                    </div>
                                    <div className="pokemon-name">{pokemon.name}</div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="load-more-section">
                    <button className="release-button" onClick={() => this.handleLoadMore()}>Load more</button>
                </div>
            </div>
        );
    }
}

export default PokemonList;