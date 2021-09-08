import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Tests of authReducer', () => {
    
    const initialState = {
        uid: '123456',
        displayName: 'Branco'
    }

    test('should works login correctly', () => {
        const action = {
            type: types.login,
            payload: {
                uid: '123456',
                displayName: 'Branco'
            }
        }
        const reducer = authReducer({}, action)
        expect(reducer).toEqual(initialState);
    });

    test('should works logout correctly', () => {
        const action = {
            type:types.logout
        }
        const reducer = authReducer(initialState, action);
        expect(reducer).toEqual({});
    });
    
    test('should works default correctly', () => {
        const action = {
            type:'lel'
        }
        const reducer = authReducer(initialState, action);
        expect(reducer).toEqual(initialState);
    });
    
    
})
