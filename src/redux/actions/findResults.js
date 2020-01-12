export const type = 'findResults';

const findResults = text =>{
    return{
        type, // Es lo mismo que hacer type:type
        payload: text,
    };
};

export default findResults;