const initData = {
    token: 'empty'
}

export const reducerToken = (state = initData, action) => {
    switch (action.type) {
        case 'ADD_TOKEN':
            console.log('Add Token', action.data);

            return { ...state, token: action.data }
        default: return state;
    }
}