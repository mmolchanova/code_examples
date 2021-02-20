import {
    ACTION_SAVE_USER
} from './const';


export function saveUser(dispatch, /* UserModel */ user) {
    dispatch({
        type: ACTION_SAVE_USER,
        payload: {
            id: user.id,
            username: user.getUsername()
        }
    });
}
