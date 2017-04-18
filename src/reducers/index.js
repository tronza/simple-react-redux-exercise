import { combineReducers } from 'redux';

import cats from './cats';
import blogPosts from './blogPosts';

const rootReducer = combineReducers({
    cats,
    blogPosts,
});

export default rootReducer;
