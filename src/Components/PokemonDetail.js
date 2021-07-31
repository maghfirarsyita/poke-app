import React from 'react';
import pokemon from './API/poke_api';

class PokemonDetail extends React.Component {
    state = {
        currsubmit: 1,
        pokemonDetail: {},
        openModal: false,
        catchInfo: '',
        pokemonAlreadyExist: false,
    };

    handleBack() {
        this.props.onSubmit(0, 1);
    }

    handleCatch() {
        const random_boolean = Math.random() < 0.5;
        const catchedPokemonInfo = {
            name: this.state.pokemonDetail.name,
            id: this.state.pokemonDetail.id
        }
        const currentList = localStorage.getItem('myPokemon');
        let myCurrentList = currentList ? JSON.parse(currentList) : [];
        myCurrentList.push(catchedPokemonInfo);
        if (random_boolean) {
            this.setState({ catchInfo: 'Congrats! You catched the pokemon!', pokemonAlreadyExist: true })
            localStorage.setItem('myPokemon', JSON.stringify(myCurrentList));
        } else {
            this.setState({ catchInfo: `Oops.. too bad you didn't catch the pokemon.` })
        }
    }

    fetchPokemonDetail = async () => {
        const response = await pokemon.get('/api/v2/pokemon/' + this.props.detailNumber);
        this.setState({
            pokemonDetail: response.data,
        })
        this.checkPokemonOwnStatus();
    }

    checkPokemonOwnStatus() {
        const currentList = localStorage.getItem('myPokemon');
        let myCurrentList = currentList ? JSON.parse(currentList) : [];
        for (let i = 0; i < myCurrentList.length; i++) {
            if (myCurrentList[i].name === this.state.pokemonDetail.name) {
                this.setState({ pokemonAlreadyExist: true });
            }
        }
        console.log('checl status', this.state.pokemonAlreadyExist);
    }

    componentDidMount() {
        this.fetchPokemonDetail();
    }

    render() {
        const { pokemonDetail, catchInfo, pokemonAlreadyExist } = this.state;
        let catchButton;
        if (pokemonAlreadyExist) {
            catchButton = <div>You already owned this pokemon.</div>
        } else {
            catchButton = <button className="catch-button" onClick={() => this.handleCatch()}>Catch this pokemon!</button>;
        };
        return (
            <div className="ui input-section">
                <button onClick={() => this.handleBack()}>Go back</button>
                <div className="detail-section">
                    <img className="profile-picture" alt={'icon-' + pokemonDetail.name} src={pokemonDetail.sprites ? pokemonDetail.sprites.other.dream_world.front_default : ''}></img>
                    <div className="name-title-section">{pokemonDetail.name}</div>
                    <div className="sprite-section">
                        <img className="sprites" alt={'fronticon-' + pokemonDetail.name} src={pokemonDetail.sprites ? pokemonDetail.sprites.front_default : ''}></img>
                        <img className="sprites" alt={'backicon' + pokemonDetail.name} src={pokemonDetail.sprites ? pokemonDetail.sprites.back_default : ''}></img>
                    </div>
                    {catchButton}
                    {catchInfo}
                    <div className="type-section">
                        <div className="name-section">Types:</div>
                        {
                            (pokemonDetail && pokemonDetail.types ? pokemonDetail.types : []).map((type, index) => {
                                return (
                                    <div className="pokemon-section" key={index}>
                                        <div className="pokemon-name">{type.type.name}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="move-section">
                        <div className="name-section">Moves:</div>
                        {
                            (pokemonDetail && pokemonDetail.moves ? pokemonDetail.moves : []).map((move, index) => {
                                return (
                                    <div className="pokemon-section" key={index}>
                                        <div className="pokemon-name">{move.move.name}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonDetail;