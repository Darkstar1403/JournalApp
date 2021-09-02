import { types } from "../types/types";


const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.uiSetError:
            //como reescribir una propiedad de un objeto
            return {
                ...state,
                msgError:action.payload
            }

        case types.uiRemoveError:
            //como reescribir una propiedad de un objeto
            return {
                ...state,
                msgError: null
            }
        case types.uiStartLoading:
            //como reescribir una propiedad de un objeto
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            //como reescribir una propiedad de un objeto
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }
}