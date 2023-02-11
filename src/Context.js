import React from "react";
import { useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

let API = "http://hn.algolia.com/api/v1/search?";

const initialState = {
   isLoading : true,
   query : "css",
   nbPages : 0,
   page : 1,
   hits : [], 
};

const AppContext = React.createContext();

// to create a provider function 
const AppProvider = ({ children }) => {  // hamare application ke andar jitna bhi data hai vo sab kuchh iske andar aa gya hai 
    
    // const [state, setState] = React.useState(initialState);
    const [ state, dispatch ] = useReducer(reducer,initialState);
    
    // dispatch({ type : "SET_LOADING" })

    useEffect(() => {
        dispatch({ type : "SET_LOADING" });
    }, []);
    
    const fetchApiData = async (url) => {
        try {   
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            dispatch({ 
                type : "GET_STORIES",
                payload :  {
                    hits : data.hits,
                    nbPages : data.nbPages,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // to remove the post 
    const removePost = (post_ID) => {
        dispatch({
            type : "REMOVE_POST",
            payload : post_ID
        })
    }

    // search functionality on keypress
    const searchPost = (searchQuery) => {
        dispatch({
            type : "SEARCH_QUERY",
            payload : searchQuery
        })
    }

    // Pagination - for prev page
    const getPrevPage = () => {
        dispatch({
            type : "PREV_PAGE"
        })
    }
    
    // Pagination - for next page
    const getNextPage = () => {
        dispatch({
            type : "NEXT_PAGE"
        })
    }

    // to call the API function
    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);  //state.query, state.page

    

    return( 
        <AppContext.Provider value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}>
            {children}  
        </AppContext.Provider>
    ); //  isme {children} hamare complete hole react ka application 
};


// custom hook create
const useGlobalContext = () => {
    return useContext(AppContext);
}


export { AppContext, AppProvider, useGlobalContext }