import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar";


jest.mock('../../../actions/auth', () =>({
    startLogout:jest.fn()
}))
jest.mock('../../../actions/notes', () =>({
    startNewNote:jest.fn()
}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{
        uid: '1',
        displayName: 'Branco'
    },
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        active:null,
        notes:[]

    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests of <SideBar/>', () => {
    const wrapper = mount(
        <Provider store={store}>
                <Sidebar/>
        </Provider>
    )
    test('should be render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('should use startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('should use startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    });

})
