const defaultState = [
     {
        id:1,
        title: 'react'
    },
    {
        id:2,
        title: 'react2'
    } 
];

function reducer( state = defaultState, { type, payload } ){
    switch(type){
        case 'findSuggestions':{
            return [
                {
                    id:1,
                    title: 'findSuggestions'
                }
            ];
        }
        default: 
            return state;
    }
}

export default reducer;
