import {set as setUserId} from '../../../app/web/utilities/set-user-id';
import getApiUrl from '../../../components/app/get-api-url';
import {BaseQuotasModel} from '../../quotas/BaseQuotasModel';


export class UserQuotasModel extends BaseQuotasModel {
    preinitialize(attributes, options = {}) {
        super.preinitialize(attributes, options);

        setUserId('UserQuotasModel', this, options.userId);
    }

    url() {
        return getApiUrl(
            `domains/${this.domainId}/users/${this.userId}/` +
            'settings/mail-quotas/'
        );
    }
}
