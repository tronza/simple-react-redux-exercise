// Actions
const BASE_STRING = 'my-app/cats/';

const LOAD = BASE_STRING + 'LOAD';
const RESET = BASE_STRING + 'RESET';
const MAKE_MORE_HUNGRY = BASE_STRING + 'MAKE_MORE_HUNGRY';
const FEED_CAT = BASE_STRING + 'FEED_CAT';
const REMOVE_CAT = BASE_STRING + 'REMOVE_CAT';

const initialState = {
    catList: [
        { name: 'Fluffy', age: 6, hungerLevel: 100 },
        { name: 'General Meowski', age: 1, hungerLevel: 50 },
        { name: 'Charlemagne', age: 2, hungerLevel: 0 },
    ],
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case MAKE_MORE_HUNGRY:
            return {
                ...state,
                catList: state.catList.map(cat => {
                    if (cat.inactive) {
                        return cat;
                    }

                    const hungerLevel = cat.hungerLevel + 40;

                    if (hungerLevel >= DISABLED_HUNGRY_LEVEL) {
                        return {
                            ...cat,
                            name: cat.name + ' (PERMANENTLY ANGRY!)',
                            hungerLevel,
                            inactive: true,
                        }
                    }

                    return {
                        ...cat,
                        hungerLevel,
                    }
                })
            };

        case FEED_CAT:
            return {
                ...state,
                catList: state.catList.map(cat => {
                    if (cat.name === action.catName) {
                        return {
                            ...cat,
                            hungerLevel: cat.hungerLevel - 25,
                        }
                    }

                    return cat;
                }),
            };

        case REMOVE_CAT:
            return {
                ...state,
                catList: state.catList.filter(cat => cat.name !== action.catName)
            };

        case RESET:
            return initialState;

        case LOAD:
            return {
                ...state,
                loading: action.loading,
            };

        default:
            return state;
    }
}

// Action Creators
export function makeCatsMoreHungry() {
    return {
        type: MAKE_MORE_HUNGRY,
    }
}

export function feedCat(cat) {
    return {
        type: FEED_CAT,
        catName: cat.name,
    }
}

export function removeCat(cat) {
    return {
        type: REMOVE_CAT,
        catName: cat.name,
    }
}

function setLoading(loading = true) {
    return {
        type: LOAD,
        loading,
    }
}

function reset() {
    return {
        type: RESET,
    }
}

// Asynchronous Action Creators
export function resetCats() {
    return function (dispatch) {
        dispatch(setLoading());

        return new Promise((resolve, reject) => {
            // Simulate an API call
            setTimeout(() => {
                dispatch(reset());
                dispatch(setLoading(false));
                resolve();
            }, 3000);
        })
    }
}

// Constants
export const DISABLED_HUNGRY_LEVEL = 150;