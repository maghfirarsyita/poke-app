import React from 'react';
import TextContainer from './Tools/TextContainer';

class PokemonMyList extends React.Component {
    state = {
        currsubmit: 1,
        currentList: localStorage.getItem('myPokemon') ? JSON.parse(localStorage.getItem('myPokemon')) : [],
        modal: false,
        selectedPokemon: '',
    };

    handleAction(action, nickname, id) {
        switch (action) {
            case 'release-modal':
                this.setState({ modal: true, selectedPokemon: nickname });
                break;
            case 'submit-release':
                const myCurrentList = this.state.currentList;
                const releasedIndex = myCurrentList.findIndex(pokemon => pokemon.nickname === this.state.selectedPokemon);
                myCurrentList.splice(releasedIndex, 1);
                localStorage.setItem('myPokemon', JSON.stringify(myCurrentList));
                this.setState({ modal: false, selectedPokemon: '' });
                break;
            case 'open-detail':
                this.props.onSubmit(id, nickname, 'detail');
                break;
            default:
                this.setState({ modal: false, selectedPokemon: '' });
        }
    }

    computedStyle() {
        if (this.state.modal) {
            return { display: 'block' };
        }
        return { display: 'none' };
    }

    render() {
        const { currentList, selectedPokemon } = this.state;
        return (
            <div className="pokemon-my-list" data-testid="my-list">
                <div className="my-section">
                    {currentList.length > 0 ?
                        <div>
                            <div className="modal" style={this.computedStyle()}>
                                <div className="modal-content">
                                    <div className="body-content">
                                        <div>Are you sure you want to release <b>{selectedPokemon}</b>?</div>
                                        <div>
                                            <button className="submit-button" onClick={() => this.handleAction('close')}>Cancel</button>
                                            <button className="submit-button" onClick={() => this.handleAction('submit-release')}>Release</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <TextContainer className="owned-section">My owned pokemon</TextContainer>
                            <div className="pokemon-list">
                                {
                                    currentList.map((pokemon, index) => {
                                        return (
                                            <div className="pokemon-section" key={'pokemon-list' + index}>
                                                <div className="pokeball" onClick={() => this.handleAction('open-detail', pokemon.nickname, pokemon.id)}>
                                                </div>
                                                <TextContainer size="14px" color="#694516" className="pokemon-nickname">{pokemon.nickname}</TextContainer>
                                                <TextContainer size="12px" className="pokemon-name">{pokemon.name}</TextContainer>
                                                <button className="release-text" onClick={() => this.handleAction('release-modal', pokemon.nickname)}>Release</button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        :
                        <TextContainer size="16px" className="centered">
                            Still empty..
                        </TextContainer>
                    }
                </div>
            </div>
        );
    }
}

export default PokemonMyList;