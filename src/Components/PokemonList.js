import React from 'react';
import pokemon from './API/poke_api';
import TextContainer from './Tools/TextContainer';

class PokemonList extends React.Component {
    state = {
        ownedTotal: 0,
        pokemonList: [],
        totalList: 50,
    };

    fetchPokemonList = async (totalLimit) => {
        try {
            const response = await pokemon.get('/api/v2/pokemon', {
                params: {
                    limit: totalLimit,
                }
            });
            this.setState({
                pokemonList: response.data.results,
            });
            this.checkOwnedTotal();
        } catch (error) {
            console.log(error.response);
        }
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
        this.props.onSubmit(pokemonUrl, '', 'detail');
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
            <div className="pokemon-list-page" data-testid="list-page">
                <TextContainer className="owned-section">
                    Owned: {ownedTotal}
                </TextContainer>
                {
                    pokemonList.length > 0 ? 
                    <div> 
                        <div className="pokemon-list">
                        {
                            pokemonList.map((pokemon, index) => {
                                return (
                                    <div className="pokemon-section" key={'pokemon-list' + index}>
                                        <div className="pokeball" onClick={() => this.handleDetail(pokemon.url)}>
                                        </div>
                                        <TextContainer size="14px" className="pokemon-name">{pokemon.name}</TextContainer>
                                    </div>
                                );
                            })
                        }
                        </div>
                        <div className="load-more-section centered">
                            <button className="release-button" onClick={() => this.handleLoadMore()}>Load more</button>
                        </div>
                    </div>
                        :
                        <TextContainer size="16px" className="centered">No list found</TextContainer>
                }
            </div>
        );
    }
}

export default PokemonList;