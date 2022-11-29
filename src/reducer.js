const reducer = (state, action) => {
    switch (action.type) {
        case "GET_STORIES": 
            return {
                ...state,
                isLoading : false,
                hits : action.payload.hits,
                nbPages : action.payload.nbPages
            };
        case "SET_LOADING": 
            return {
                ...state,
                isLoading: true
            };
        case "REMOVE_POST":
            return {
                ...state,
                hits : state.hits.filter((curElem) => {
                    return (
                        curElem.objectId !== action.payload
                    )
                }),
            }
        case "SEARCH_QUERY": 
            return {
                ...state,
                query : action.payload

            }   
        case "NEXT_PAGE": 
            let pageNumInc = state.page + 1;
            if(pageNumInc > state.nbPages){
                pageNumInc = 1;
            } 
            return {
                ...state,
                page : pageNumInc 
            }
        case "PREV_PAGE": 
            let pageNum = state.page - 1;
            if(pageNum <= 0){
                pageNum = 1;
            } 
            return {
                ...state,
                page : pageNum 
            }
        default : return state;    
    }
    // return state;    
};

export default reducer;