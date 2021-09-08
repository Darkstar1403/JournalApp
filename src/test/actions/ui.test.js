import {finishLoading, removeError, setError, startLoading} from '../../actions/ui';
import { types } from '../../types/types';

describe('Tests of ui actions', () => {
    
    test('should All actions work correctly', () => {
        const action =  setError('hola');
        const remove = removeError();
        const start = startLoading();
        const finish = finishLoading();
        expect(action).toEqual({
            type:types.uiSetError,
            payload: 'hola'
        });
        expect(remove).toEqual({
            type: types.uiRemoveError
        });
        expect(start).toEqual({
            type: types.uiStartLoading
        });
        expect(finish).toEqual({
            type: types.uiFinishLoading
        });
    })
    
})
