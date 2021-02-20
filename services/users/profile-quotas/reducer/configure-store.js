import {createStore} from '../../../../app/web/components/state-manange';
import {applyMiddleware} from '../../../../app/web/components/state-manange/apply-middleware';
import {getEffectsMiddleware} from '../../../../app/web/components/state-manange/backbone/middleware';
import {thunk} from '../../../../app/web/components/state-manange/middleware/thunk';

import {saveUser} from './actions';
import {reducer} from './reducer';


export function configureStore({effects, user} = {}) {
    const effectsMiddleware = getEffectsMiddleware(effects);

    const store =  createStore(reducer, applyMiddleware(
        effectsMiddleware,
        thunk
    ));
    saveUser(store.dispatch, user);

    return store;
}
