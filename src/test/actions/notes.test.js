/*** @jest-environment node */
import { deleteDoc, terminate, doc, getDoc } from '@firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../components/firebase/firebase-config';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => {
    return {
        fileUpload: () => {
            return Promise.resolve(
                "https://misfotos.com/photo.png"
            );
        },
    };
});
global.File = class MockFile {
    constructor(parts, filename, properties) {
        this.filename = filename;
    }
};
global.scrollTo = jest.fn();
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{
        uid:'TESTING'
    },
    notes:{
        active:{
            id:'57nEiPIUANcgxN2vpvsF',
            title: 'Hola',
            body: 'mundo'
        }
    }
};
let store = mockStore(initState);

describe('Tests of notes actions', () => {

    beforeEach(()=>{
        store = mockStore(initState);
    });
//esto evita que la base de datos siga esperando que la aplicación realice
//ciertas acciones que no podra ya que es el entorno de pruebas
    afterAll(()=>{
        terminate(db)
    });  

    test('should create a new note with startNewNote', async() => {
        await store.dispatch(startNewNote());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        expect(actions[1]).toEqual({
            type:types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        
         const refDoc = doc(db, `/TESTING/journal/notes/${actions[0].payload.id}`);
         await deleteDoc(refDoc);
    });

    test('should use startLoadingNotes correctly', async() => {
        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:types.notesLoad,
            payload: expect.any(Array)
        });

        const expectedObj ={
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }
        expect(actions[0].payload[0]).toMatchObject(expectedObj);
    });

    test('should use startSaveNote correctly', async() => {
       const note = {
           id:'57nEiPIUANcgxN2vpvsF',
           title:'titulo',
           body: 'Hola mundo'
       }
       await store.dispatch(startSaveNote(note));
       const actions = store.getActions();
    
       expect(actions[0].type).toBe(types.notesUpdated);
       const refDoc = doc(db, `/TESTING/journal/notes/${note.id}`);
       const document = await getDoc(refDoc);

       expect(document.data().title).toBe(note.title)
    });
    
    test('should use startUploading correctly', async() => {
        global.File = class MockFile {
            constructor(parts, filename, properties) {
                this.filename = filename;
            }
        };
        const file = new File([],'foto.jpg');
        await store.dispatch(startUploading(file));
        const refDoc = doc(db, `/TESTING/journal/notes/${initState.notes.active.id}`);
        const document = await getDoc(refDoc);
        expect(document.data().url).toBe("https://misfotos.com/photo.png");
    })
    
    
})
