import React from 'react';
import pokemon from './API/poke_api';

class PokemonList extends React.Component {
    state = {
        ownedTotal: 0,
        pokemonList: [],
        urlApi: 'https://pokeapi.co/api/v2/pokemon'
    };

    fetchPokemonList = async () => {
        const response = await pokemon.get('/api/v2/pokemon', {
            params: {
                limit: 50,
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
        this.fetchPokemonList();
    }

    handleDetail(pokemon) {
        const pokemonUrl = pokemon.split('/')[6];
        console.log('pokemon', pokemonUrl);
        this.props.onSubmit(pokemonUrl, 2);
    }

    handleCheckList() {
        this.props.onSubmit(0, 3);
    }


    render() {
        const { pokemonList, ownedTotal } = this.state;
        return (
            <div className="body">
                <div className="title">
                    ALL POKEMON LIST
                </div>
                <div className="owned-section">
                    Owned: {ownedTotal}
                    {/* <button onClick={() => this.handleCheckList()}>Check my list</button> */}
                </div>
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
            </div>
        );
    }
}

export default PokemonList;