export const type = 'findCurrentItem';

const findCurrentItem = id =>{
    return{
        type, // Es lo mismo que hacer type:type
        payload: id,
    };
};

export default findCurrentItem;