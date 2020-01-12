import { createStore, combineReducers } from 'redux';
import results from '../redux/reducers/results';
import suggestions from '../redux/reducers/suggestions';
import currentItem from '../redux/reducers/currentItems';

const reducer = combineReducers({
    results, 
    suggestions,
    currentItem
});

const store = createStore(reducer);

export default store;