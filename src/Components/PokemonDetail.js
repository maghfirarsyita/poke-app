import React from 'react';
import pokemon from './API/poke_api';

class PokemonDetail extends React.Component {
    state = {
        currsubmit: 1,
        pokemonDetail: {},
        modal: false,
        catchStatus: false,
        pokemonAlreadyExist: false,
        startCatching: false,
        nickname: '',
        currentList: localStorage.getItem('myPokemon') ? JSON.parse(localStorage.getItem('myPokemon')) : [],
        warning: '',
        catchInfo: true,
        possiblity: false,
        isGoingToRelease: false,
    };

    handleAction(action) {
        switch (action) {
            case 'catch':
                this.setState({ modal: true, possiblity: Math.random() < 0.5 });
                setTimeout(() => {
                    this.setState({ startCatching: true });
                }, 1500);
                break;
            case 'release':
                this.setState({ modal: true, isGoingToRelease: true });
                break;
            case 'submit-nickname':
                this.handleNickname();
                break;
            case 'submit-release':
                const myCurrentList = this.state.currentList;
                const releasedIndex = myCurrentList.findIndex(pokemon => pokemon.nickname === this.props.detailNickname);
                myCurrentList.splice(releasedIndex, 1);
                localStorage.setItem('myPokemon', JSON.stringify(myCurrentList));
                this.props.onSubmit(0, 3);
                this.handleAction('close');
                break;
            default:
                this.setState({ modal: false, startCatching: false, isGoingToRelease: false });
                break;
        }
    }

    handleNickname() {
        const myCurrentList = this.state.currentList;
        let isAvailableNickname = true;
        myCurrentList.forEach(list => {
            if (list.nickname === this.state.nickname && list.id === this.state.pokemonDetail.id) {
                isAvailableNickname = false;
                return;
            }
        });

        if (isAvailableNickname) {
            const catchedPokemonInfo = {
                name: this.state.pokemonDetail.name,
                id: this.state.pokemonDetail.id,
                nickname: this.state.nickname,
            }
            myCurrentList.push(catchedPokemonInfo);
            localStorage.setItem('myPokemon', JSON.stringify(myCurrentList));
            this.setState({ warning: '', nickname: '' });
            this.handleAction('close');
        } else {
            this.setState({ warning: 'You already own this nickname. Choose other nickname!' });
            return;
        }
    }

    fetchPokemonDetail = async () => {
        const response = await pokemon.get('/api/v2/pokemon/' + this.props.detailNumber);
        this.setState({
            pokemonDetail: response.data,
        })
        this.checkPokemonDetail();
        this.checkPokemonOwnStatus();
    }

    checkPokemonOwnStatus() {
        const myCurrentList = this.state.currentList;
        myCurrentList.forEach(list => {
            if (list.nickname === this.state.pokemonDetail.nickname) {
                this.setState({ pokemonAlreadyExist: true });
            }
        })
    }

    checkPokemonDetail() {
        const myCurrentList = this.state.currentList;
        myCurrentList.forEach(list => {
            if (list.id === this.state.pokemonDetail.id && list.nickname === this.props.detailNickname) {
                this.setState({
                    pokemonDetail: {
                        ...this.state.pokemonDetail,
                        nickname: list.nickname
                    }
                })
            }
        })
    }

    computedStyle() {
        if (this.state.modal) {
            return { display: 'block' };
        }
        return { display: 'none' };
    }

    onChangeInput = (e) => {
        this.setState({ nickname: e.target.value });
    }

    componentDidMount() {
        this.fetchPokemonDetail();
    }

    render() {
        const { pokemonDetail, startCatching, warning, pokemonAlreadyExist, possiblity, isGoingToRelease } = this.state;

        const pokemonExist = pokemonAlreadyExist && this.props.detailNickname;
        const catchButton = <button className="catch-button" onClick={() => this.handleAction('catch')}>
            Catch this pokemon
        </button>;
        const releaseButton = <button className="release-button" onClick={() => this.handleAction('release')}>
            Release this pokemon
        </button>;
        const actionButton = pokemonExist ? releaseButton : catchButton;
        let modalContent;
        if (isGoingToRelease) {
            modalContent = <div className="body-content">
                <div>Are you sure you want to release <b>{pokemonDetail.nickname}</b>?</div>
                <div>
                    <button className="submit-button" onClick={() => this.handleAction('close')}>Cancel</button>
                    <button className="submit-button" onClick={() => this.handleAction('submit-release')}>Release</button>
                </div>
            </div>;
        } else if (startCatching) {
            if (possiblity) {
                modalContent = <div className="body-content">
                    <img className="profile-picture" width="100px" alt={'icon-' + pokemonDetail.name} src={pokemonDetail.sprites ? pokemonDetail.sprites.other.dream_world.front_default : ''}></img>
                    <div className="title">Congrats!</div>
                    <div>You caught the pokemon, now give a nickname!</div>
                    <input className="input-nickname" placeholder="Input name here" value={this.state.nickname} onChange={this.onChangeInput} />
                    <div>
                        <button className="submit-button" onClick={() => this.handleAction('close')}>Cancel</button>
                        <button className="submit-button" onClick={() => this.handleAction('submit-nickname')}>Save</button>
                    </div>
                    <div className="warning-text">{warning}</div>
                </div>
            } else {
                modalContent = <div className="body-content">
                    <div className="title">Too bad..</div>
                    <div>You failed to catch the pokemon.</div>
                    <button className="back-button" onClick={() => this.handleAction('close')}>Try later</button>
                </div>
            }
        } else {
            modalContent = <div className="body-content">catching....</div>
        }

        return (
            <div className="pokemon-detail">
                <div className="modal" style={this.computedStyle()}>
                    <div className="modal-content">
                        {modalContent}
                    </div>
                </div>
                <div className="detail-section">
                    <img className="profile-picture" width="100px" alt={'icon-' + pokemonDetail.name} src={pokemonDetail.sprites ? pokemonDetail.sprites.other.dream_world.front_default : ''}></img>
                    <div className="name-title-section">{pokemonDetail.name}</div>
                    {
                        pokemonDetail.nickname ? <div className="nickname-section">
                            <div className="nickname-label">Nickname: </div>
                            <div className="nickname-text-section">
                                {pokemonDetail.nickname ? pokemonDetail.nickname : ''}
                            </div>
                        </div> : ''
                    }
                    <div className="sprite-section">
                        <img className="sprites" alt={'fronticon-' + pokemonDetail.name} src={pokemonDetail.sprites ? pokemonDetail.sprites.front_default : ''}></img>
                        <img className="sprites" alt={'backicon' + pokemonDetail.name} src={pokemonDetail.sprites ? pokemonDetail.sprites.back_default : ''}></img>
                    </div>
                    {actionButton}
                    <div className="type-section">
                        <div className="name-section">Types:</div>
                        {
                            (pokemonDetail && pokemonDetail.types ? pokemonDetail.types : []).map((type, index) => {
                                return (
                                    <div className="" key={index}>
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
                                    <div className="" key={index}>
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