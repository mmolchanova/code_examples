import {connect} from '../../../app/web/components/state-manange';
import {dialogIsOpen} from '../../../app/web/components/state-manange/utilities/store/dialog-is-open';
import {getDialogData} from '../../../app/web/components/state-manange/utilities/store/get-dialog-data';
import {
    requestQuotasConfigSave,
    toggleQuotasConfirmDialog
} from '../actions/actions';
import {QUOTAS_DIALOG_ID} from '../const';

import {QuotasConfirmDialog as PureQuotasConfirmDialog} from './QuotasConfirmDialog';


function mapStateToProps(state) {
    return {
        open: dialogIsOpen(state, QUOTAS_DIALOG_ID),
        data: getDialogData(state, QUOTAS_DIALOG_ID)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClose() {
            toggleQuotasConfirmDialog(dispatch, {
                open: false
            });
        },

        onPositiveClick(data) {
            requestQuotasConfigSave(dispatch, data);
        }
    };
}

export const QuotasConfirmDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureQuotasConfirmDialog);
