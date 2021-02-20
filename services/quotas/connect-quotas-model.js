import {
    finishLoading,
    startLoading,
    toggleErrors
} from '../../app/web/reducer-common/actions';
import {connectBackbone} from '../../app/web/components/state-manange';
import {ERROR as ACTION_ERROR} from '../../actions/app';

import {
    setQuotasConfig,
    toggleQuotasConfirmDialog
} from './actions/actions';



function mapDispatchToEvents(dispatch) {
    return {
        request() {
            startLoading(dispatch, 'quotas');
        },

        sync(model) {
            finishLoading(dispatch, 'quotas');

            toggleQuotasConfirmDialog(dispatch, {
                open: false
            });

            setQuotasConfig(dispatch, {
                data: model.toJSON()
            });
        },

        [ACTION_ERROR](errors) {
            finishLoading(dispatch, 'quotas');

            toggleQuotasConfirmDialog(dispatch, {
                open: false
            });

            if (!errors.fields || errors.fields.length === 0) {
                return;
            }

            toggleErrors(dispatch, {
                formId: 'quotas',
                errors: errors.fields
            });
        }
    };
}
const connectModel = connectBackbone(mapDispatchToEvents);

export function connectQuotasModel(store, model) {
    return connectModel(store, model);
}
