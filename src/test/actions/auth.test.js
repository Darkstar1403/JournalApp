/*** @jest-environment node */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';

import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

describe('Tests of auth actions', () => {
    beforeEach(()=>{
        store = mockStore(initState);
    });

    test('should  works login and logout correctly', () => {
        // store.dispatch(login('123456', 'Juan'));
        // store.dispatch(logout());
        // const actions = store.getActions();
        // expect(actions[0].payload.uid).toBe('123456');
        // expect(actions[1].type).toBe(types.logout);

        const uid = '12345';
        const displayName = 'Juan';

        const loginAction = login(uid,displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type:types.login,
            payload:{
                uid,
                displayName
            }
        });
        expect(logoutAction).toEqual({
            type:types.logout
        })

    });

    test('should works startLogout correctly', async() => {
        await store.dispatch(startLogout());

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:types.logout
        });
        expect(actions[1]).toEqual({
            type: types.notesLogout
        });
    });
    
    test('should use startLoginEmailPassword correctly', async() => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({
            type: types.login,
            payload:{
                uid: expect.any(String),
                displayName: null
            }
        });
    })
    
})
