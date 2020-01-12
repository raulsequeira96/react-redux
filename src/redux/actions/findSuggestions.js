export const type = 'findSuggestions';

const findSuggestions = text =>{
    return{
        type, // Es lo mismo que hacer type:type
        payload: text,
    };
};

export default findSuggestions;