import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { activeNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";


jest.mock('../../../actions/notes', () =>({
    startNewNote:jest.fn(),
    activeNote:jest.fn()
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
        active:{
            id:1234,
            title:'Hola',
            body:'Mundo',
            date:1234
        },
        notes:[]

    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests of <NoteScreem/>', () => {
    const wrapper = mount(
        <Provider store={store}>
                <NoteScreen/>
        </Provider>
    )
    test('should be render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('should use activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target:{
                name:'title',
                value:'HIiiii'
            }
        });
        expect(activeNote).toHaveBeenLastCalledWith(1234,
            {
                body: 'Mundo',
                title:'HIiiii',
                id:1234,
                date:1234
            });
    })
    
})
