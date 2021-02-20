import {
    hideErrors
} from '../../../app/web/reducer-common/actions';
import {connect} from '../../../app/web/components/state-manange';
import {getErrors} from '../../../app/web/components/state-manange/utilities/form/get-errors';
import {getForm} from '../../../app/web/components/state-manange/utilities/form/get-form';
import {
    setQuotasDefaultValues,
    toggleQuotasConfirmDialog
} from '../../quotas/actions/actions';
import {getErrorsFields} from '../../quotas/quotas-form/get-errors-fields';
import {PureQuotasForm} from '../../quotas/quotas-form/PureQuotasForm';



function mapStateToProps(state) {
    const isLoading = state.loading.quotas === true ||
        state.loading.quotasDefault === true;

    return {
        username: state.user.username,
        isLoading,
        data: getForm(state, 'quotas'),
        defaultData: state.forms.quotas.defaultData || {},
        errors: getErrors(state, 'quotas')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmit(event, data) {
            event.preventDefault();

            toggleQuotasConfirmDialog(dispatch, {
                open: true,
                ...data
            });
        },

        onChange(event) {
            const fieldId = event?.target?.name;

            if (!fieldId) {
                return;
            }

            hideErrors(dispatch, {
                formId: 'quotas',
                fields: getErrorsFields(fieldId)
            });
        },

        onReturnDefaults() {
            setQuotasDefaultValues(dispatch);
        }
    };
}

export const QuotasForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureQuotasForm);
