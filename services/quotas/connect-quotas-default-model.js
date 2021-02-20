import {
    finishLoading,
    startLoading
} from '../../app/web/reducer-common/actions';
import {connectBackbone} from '../../app/web/components/state-manange';
import {ERROR as ACTION_ERROR} from '../../actions/app';

import {
    setQuotasDefaultConfig
} from './actions/actions';


function mapDispatchToEvents(dispatch) {
    return {
        request() {
            startLoading(dispatch, 'quotasDefault');
        },

        sync(model) {
            finishLoading(dispatch, 'quotasDefault');

            setQuotasDefaultConfig(dispatch, {
                data: model.toJSON()
            });
        },

        [ACTION_ERROR]() {
            finishLoading(dispatch, 'quotasDefault');
        }
    };
}
const connectModel = connectBackbone(mapDispatchToEvents);

export function connectQuotasDefaultModel(store, model) {
    return connectModel(store, model);
}
