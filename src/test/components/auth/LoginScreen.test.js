import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";
import { LoginScreen } from "../../../components/auth/LoginScreen";

jest.mock('../../../actions/auth', () =>({
    startGoogleLogin:jest.fn(),
    startLoginEmailPassword:jest.fn()
}))
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
store.dispatch = jest.fn();
describe('Tests of <LoginScreen/>', () => {
    beforeEach(()=>{
        store = mockStore(initState);
        //si usamos algun mock es buena idea limpiarlo
        jest.clearAllMocks();
    });

    const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter>
             <LoginScreen/>
          </MemoryRouter>
      </Provider>
        
    );

    test('should be render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should use startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('should use startLogin', () => {
        wrapper.find('form').prop('onSubmit')(
            {preventDefault(){}}
        );
        expect(startLoginEmailPassword).toHaveBeenCalledWith('','')
    })
    
    
    
});