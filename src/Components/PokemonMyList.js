import React from 'react';

class PokemonMyList extends React.Component {
    state = {
        currsubmit: 1
    };

    handleDetail(detailNumber) {
        this.props.onSubmit(detailNumber, 2);
    }

    handleBack() {
        this.props.onSubmit(0, 1);
    }

    render() {
        return (
            <div className="my-list">
                <div>
                    THIS IS MY POKEMON list
                    <button onClick={() => this.handleDetail(1)}>pokemon 1</button>
                    <button onClick={() => this.handleDetail(2)}>pokemon 2</button>
                    <button onClick={() => this.handleDetail(3)}>pokemon 3</button>
                </div>
                <button onClick={() => this.handleBack()}>Go back</button>
            </div>
        );
    }
}

export default PokemonMyList;