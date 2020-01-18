import { type as findSuggestionsType } from '../actions/findSuggestions';
import items from '../../data/items';

const defaultState = [];

function reducer( state = defaultState, { type, payload } ){
    switch(type){
        case findSuggestionsType:{
            const regex = new RegExp(`^${payload}`, 'i'); // (buscar todos los elementos que tengan el titulocon el payload que el usuario ingreso, no respetar mayusculas y minusculas)

            return items.filter(n => regex.test(n.title));
        }
        default: 
            return state;
    }
}

export default reducer;
