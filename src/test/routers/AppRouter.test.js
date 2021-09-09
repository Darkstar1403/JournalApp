import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { AppRouter } from "../../routers/AppRouter";
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { login } from "../../actions/auth";
import Swal from "sweetalert2";


jest.mock('../../actions/auth', () =>({
    login:jest.fn()
}))
jest.mock('sweetalert2', () =>({
    fire:jest.fn()
}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        active:{
            id:'abd',
            notes:[]
        },
        notes:[]

    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests of <AppRouter/>', () => {
    
    test('should render the login if im authenticated', async() => {
        let user;

        await act(async()=>{
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');
            user = userCred.user;
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
            )
    
        });

        expect(login).toHaveBeenCalledWith('v1u9zhs56SdndexJRtiHBdZoAOc2', null);

    })
    
})
