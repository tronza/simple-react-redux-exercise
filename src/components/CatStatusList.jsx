import React from 'react';
import {connect} from 'react-redux';

import {
    DISABLED_HUNGRY_LEVEL,
    feedCat,
    makeCatsMoreHungry,
    removeCat,
    resetCats,
} from '../reducers/cats';

class CatStatusList extends React.Component {
    componentDidMount() {
        // Make cats hungrier every 10 seconds.
        this._interval = setInterval(() => this.props.makeCatsMoreHungry(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const {
            cats,
            feedCat,
            removeCat,
            resetCats,
            loading,
        } = this.props;

        return (
            <div>
                <h1>Meow. Am I hungry?</h1>
                {loading &&
                <div>
                    LOADING CATS!
                </div>
                }
                {!loading &&
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Hungry?</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cats.map(cat => {
                            const isHungry = cat.hungerLevel >= 50;

                            let backgroundColor;

                            if (isHungry) {
                                // Red
                                backgroundColor = `rgba(255, 0, 0, ${cat.hungerLevel / 100})`;
                            } else {
                                // Green
                                backgroundColor = `rgba(0, 255, 0, ${1 - (cat.hungerLevel / 50)})`;
                            }

                            return (
                                <tr key={`cat-${cat.name}`}>
                                    <td>
                                        {cat.name}
                                    </td>
                                    <td>
                                        {cat.age}
                                    </td>
                                    <td style={{backgroundColor}}>
                                        {isHungry ? 'yes' : 'no'}
                                        {cat.hungerLevel}
                                    </td>
                                    <td>
                                        {cat.hungerLevel > 0 && cat.hungerLevel < DISABLED_HUNGRY_LEVEL
                                            ? <button onClick={() => feedCat(cat)}>Feed</button>
                                            : ''}
                                        {cat.hungerLevel >= DISABLED_HUNGRY_LEVEL
                                            ? <button onClick={() => removeCat(cat)}>Remove</button>
                                            : ''}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <button onClick={() => resetCats()}>Reset!</button>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.cats.loading,
        cats: state.cats.catList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeCatsMoreHungry: () => dispatch(makeCatsMoreHungry()),
        feedCat: (cat) => dispatch(feedCat(cat)),
        removeCat: (cat) => dispatch(removeCat(cat)),
        resetCats: () => dispatch(resetCats()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatStatusList);