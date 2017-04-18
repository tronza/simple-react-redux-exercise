import React from 'react';
import {connect} from 'react-redux';

// Importing action creators (and one constant) from cats -reducer
import {
    addCat,
    DISABLED_HUNGRY_LEVEL,
    feedCat,
    makeCatsMoreHungry,
    removeCat,
    resetCats,
} from '../reducers/cats';

// Look, it's a component with no internal state!
class CatStatusList extends React.Component {
    componentDidMount() {
        // Make cats hungrier every 10 seconds.
        this._interval = setInterval(() => this.props.makeCatsMoreHungry(), 10000);
    }

    componentWillUnmount() {
        // Don't make cats hungrier anymore.
        clearInterval(this._interval);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.addCat({
            age: this.age.value,
            name: this.name.value,
        });
    };

    render() {
        const {
            addCat, // It's important to use the action creator method provided by the props, notice the same function name as in import statement!
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
                        {cats.map((cat) => {
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
                                    <td style={{backgroundColor}} className="hungry-meter">
                                        {cat.hungerLevel}%
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
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <h2>Add a new cat!</h2>

                    <label>Name:</label>
                    <input type="text" ref={(input) => this.name = input} />

                    <label>Age:</label>
                    <input type="number" ref={(input) => this.age = input} />

                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}

// Map Redux store's to this particular component's props
const mapStateToProps = (state) => {
    return {
        loading: state.cats.loading,
        cats: state.cats.catList,
    }
};

// Map Action dispatches to this component's props
const mapDispatchToProps = (dispatch) => {
    return {
        makeCatsMoreHungry: () => dispatch(makeCatsMoreHungry()),
        feedCat: (cat) => dispatch(feedCat(cat)),
        removeCat: (cat) => dispatch(removeCat(cat)),
        resetCats: () => dispatch(resetCats()),
        addCat: (cat) => {
            // TODO: implement!
            console.log(cat);
        }
    }
};

// Redux magic!
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatStatusList);