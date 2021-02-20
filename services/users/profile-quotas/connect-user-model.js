import {connectBackbone} from '../../../app/web/components/state-manange';

import {saveUser} from './reducer/actions';


function mapDispatchToEvents(dispatch) {
    return {
        sync(user) {
            saveUser(dispatch, user);
        }
    };
}

export function connectUserModel(store, user) {
    const unsubscribe = connectBackbone(mapDispatchToEvents)(
        store,
        user
    );

    return unsubscribe;
}
