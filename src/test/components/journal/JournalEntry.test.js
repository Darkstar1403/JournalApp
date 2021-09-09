import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests of <JournalEntry/>', () => {
    const note = {
        id:0,
        date:0,
        title: 'Hola',
        body:'Mundo',
        url:'foto.com/fot.jpf'
    }

    const wrapper = mount(
        <Provider store={store}>
                <JournalEntry {...note}/>
        </Provider>
    )
    test('should be render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should activate the note', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        );
    })
    
    
})
