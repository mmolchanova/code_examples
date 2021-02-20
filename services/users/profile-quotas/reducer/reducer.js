import {
    ACTION_FINISH_LOADING,
    ACTION_START_LOADING,
    HIDE_ERRORS,
    TOGGLE_ERRORS
} from '../../../../app/web/reducer-common/const';
import {getReducer} from '../../../../app/web/components/state-manange/get-reducer';
import {getDefaultData} from '../../../../app/web/components/state-manange/utilities/form/get-default-data';
import {getErrors} from '../../../../app/web/components/state-manange/utilities/form/get-errors';
import {setDefaultData} from '../../../../app/web/components/state-manange/utilities/form/set-default-data';
import {setErrors} from '../../../../app/web/components/state-manange/utilities/form/set-errors';
import {setForm} from '../../../../app/web/components/state-manange/utilities/form/set-form';
import {updateProp} from '../../../../app/web/components/state-manange/utilities/update-prop';
import {updateDialog} from '../../../im/subscription/reducer/update-dialog';
import {
    SET_QUOTAS_CONFIG,
    SET_QUOTAS_DEFAULT_CONFIG,
    SET_QUOTAS_DEFAULT_VALUES,
    TOGGLE_QUOTAS_DIALOG
} from '../../../quotas/actions/const';
import {QUOTAS_DIALOG_ID} from '../../../quotas/const';

import {
    ACTION_SAVE_USER
} from './const';


const initialState = {
    user: {
        id: null,
        username: ''
    },

    forms: {
        quotas: {
            data: {},
            defaultData: {},
            errors: []
        }
    },

    dialogs: {
        [QUOTAS_DIALOG_ID]: {
            show: false
        }
    },

    loading: {
        quotas: false,
        quotasDefault: false
    }
};


export const reducer = getReducer(initialState, {
    [ACTION_SAVE_USER](state, user) {
        return updateProp(state, 'user', {
            ...state.user,
            ...user
        });
    },

    [TOGGLE_QUOTAS_DIALOG](state, {id, state: dialogState, data}) {
        return updateDialog(state, id, dialogState, data);
    },

    [SET_QUOTAS_CONFIG]: (state, {data}) => {
        return setForm(state, 'quotas', data);
    },

    [SET_QUOTAS_DEFAULT_CONFIG]: (state, {data}) => {
        return setDefaultData(state, 'quotas', data);
    },

    [SET_QUOTAS_DEFAULT_VALUES]: (state) => {
        const data = getDefaultData(state, 'quotas');

        return setForm(state, 'quotas', data);
    },

    [TOGGLE_ERRORS](state, {formId, errors}) {
        return setErrors(state, formId, errors);
    },

    [HIDE_ERRORS](state, {formId, fields}) {
        const errors = getErrors(state, formId);
        let filteredErrors = [];

        if (fields.length > 0) {
            filteredErrors = errors.filter(function({field}) {
                return !fields.includes(field);
            });
        }

        return setErrors(state, formId, filteredErrors);
    },

    [ACTION_START_LOADING]: (state, modelId) => {
        return updateProp(state, ['loading', modelId], true);
    },

    [ACTION_FINISH_LOADING]: (state, modelId) => {
        return updateProp(state, ['loading', modelId], false);
    }
});
