import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    }
};
let store = mockStore(initState);
//store.dispatch = jest.fn();

describe('Tests of <RegisterScreen/>', () => {
    // beforeEach(()=>{
    //     store = mockStore(initState);
    //     //si usamos algun mock es buena idea limpiarlo

    // });
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen/>
            </MemoryRouter>
        </Provider>
    );

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should use the correct dispatch', () => {
        const nameField = wrapper.find('input[name="name"]');

        nameField.simulate('change',{
            target:{
                value:'brancoasddd@ sdd',
                name:'name'
            }
        });
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        const actions = store.getActions();
        console.log(actions);
    })
    


    
})
