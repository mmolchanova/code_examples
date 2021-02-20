import {toggleDialogAction} from '../../im/subscription/reducer/toggle-dialog-action';
import {QUOTAS_DIALOG_ID} from '../const';

import {
    REQUEST_QUOTAS_CONFIG_SAVE,
    RESET_QUOTAS_VALUES,
    SET_QUOTAS_CONFIG,
    SET_QUOTAS_DEFAULT_CONFIG,
    SET_QUOTAS_DEFAULT_VALUES,
    TOGGLE_QUOTAS_DIALOG
} from './const';


export const toggleQuotasConfirmDialog = toggleDialogAction(
    TOGGLE_QUOTAS_DIALOG,
    QUOTAS_DIALOG_ID
);

export function requestQuotasConfigSave(dispatch, payload) {
    return dispatch({
        meta: {
            effect: true
        },
        type: REQUEST_QUOTAS_CONFIG_SAVE,
        payload
    });
}

export function setQuotasConfig(dispatch, payload) {
    return dispatch({
        type: SET_QUOTAS_CONFIG,
        payload
    });
}

export function setQuotasDefaultConfig(dispatch, payload) {
    return dispatch({
        type: SET_QUOTAS_DEFAULT_CONFIG,
        payload
    });
}

export function resetQuotasValues(dispatch) {
    return dispatch({
        type: RESET_QUOTAS_VALUES
    });
}

export function setQuotasDefaultValues(dispatch) {
    return dispatch({
        type: SET_QUOTAS_DEFAULT_VALUES
    });
}
