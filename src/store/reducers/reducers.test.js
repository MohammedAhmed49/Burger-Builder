import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {
    it('should return the initial reducer', () => {
        expect(reducer(undefined, { type: actionTypes.AUTH_INIT })).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('should return the updated state on success', () => {
        expect(reducer({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, 
        { type: actionTypes.AUTH_SUCCESS, 
        idToken: 'momo', userId: 'id' })).toEqual({
            idToken: 'momo',
            userId: 'id',
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });
});