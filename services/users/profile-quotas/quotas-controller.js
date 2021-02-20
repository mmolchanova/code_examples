import {mapValues} from '../../../../../app/js/utilities';
import {permissions} from '../../../auth';
import {
    PREFERENCES as PREFERENCES_FEATURE,
    QUOTAS_PREFERENCES_USER as QUOTAS_PREFERENCES_USER_FEATURE
} from '../../../components/app/feature';
import {initControllerBackbone} from '../../../utilities/backbone/init-controller-backbone';
import {invokeMethod} from '../../../utilities/backbone/invoke-method';
import {invokeSaveOn} from '../../../utilities/backbone/invoke-save';
import {connectQuotasDefaultModel} from '../../quotas/connect-quotas-default-model';
import {connectQuotasModel} from '../../quotas/connect-quotas-model';
import {
    ATTACHMENT_FORBIDDEN,
    LINK_FORBIDDEN,
    _ATTACHMENT_ALLOWED,
    _LINK_ALLOWED
} from '../../quotas/fields';
import {getValueToSend} from '../../quotas/get-value-to-send';
import {BaseProfileController} from '../base/BaseProfileController';

import {connectUserModel} from './connect-user-model';
import {Page} from './Page';
import {configureStore} from './reducer/configure-store';
import {getEffects} from './reducer/get-effects';
import {UserQuotasModel} from './UserQuotasModel';


function initQuotas(controller, userId) {
    return initControllerBackbone(controller, UserQuotasModel, {
        prop: 'quotas',
        reusableId: 'user-quotas',
        domainId: controller.api.domain.getId(),
        userId
    });
}

export default class QuotasController extends BaseProfileController {
    beforeInitialize(routeParams) {
        if (
            !this.api.features.has(PREFERENCES_FEATURE) ||
            !this.api.features.has(QUOTAS_PREFERENCES_USER_FEATURE) ||
            !this.api.session.hasPerm(permissions.CAN_CHANGE_QUOTAS_USER)
        ) {
            return false;
        }

        return super.beforeInitialize(routeParams);
    }

    initialize() {
        super.initialize();

        const username = this.user.getUsername();
        this.setTitle(`Размеры ящика ${username}`);

        this.initStore();
        this.mountPage();

        const unsubscribe = connectUserModel(this.store, this.user);
        this.registerDestroyCallback(unsubscribe);

        this.initQuotas();
        this.initQuotasDefault();

        this.api.analytics.setPage({
            category: 'user:quotas'
        });
    }

    initStore() {
        if (this.store) {
            throw new Error(
                'QuotasController#initStore: store already initialized'
            );
        }

        const effects = getEffects(this);
        this.store = configureStore({
            effects,
            user: this.user
        });
    }

    mountPage() {
        if (!this.store) {
            throw new Error('QuotasController#mountPage: store is not created');
        }

        const contextRouter = {
            reverse: (routeId, params) => this.api.router.url(routeId, params)
        };

        this.api.layout.mountReact(
            <Page
                store={this.store}
                router={contextRouter}
            />
        );

        this.registerDestroyCallback(this.api.layout.unmountReact);
    }

    initQuotas() {
        const model = initQuotas(this, this.user.id);

        const unsubscribe = model.connect(connectQuotasModel);
        this.registerDestroyCallback(this[unsubscribe]);

        return model.fetch();
    }

    initQuotasDefault() {
        const quotasDefault = new UserQuotasModel(null, {
            domainId: this.api.domain.getId(),
            userId: this.user.id
        });

        const unsubscribe = connectQuotasDefaultModel(
            this.store,
            quotasDefault
        );

        this.registerDestroyCallback(unsubscribe);

        return invokeMethod(quotasDefault, 'fetch', null, {
            data: 'default'
        });
    }

    changeQuotasConfig({
        [_ATTACHMENT_ALLOWED]: isAttachmentAllowed,
        [_LINK_ALLOWED]: isLinkAllowed,
        ...data
    }) {
        const mappedData = mapValues(data, getValueToSend);

        const dataToSend = {
            ...mappedData,
            [ATTACHMENT_FORBIDDEN]: !isAttachmentAllowed,
            [LINK_FORBIDDEN]: !isLinkAllowed
        };
        const mailQuotas = this.api.reusables.getReusable('user-quotas');

        return invokeSaveOn(mailQuotas, dataToSend, {
            type: 'patch'
        });
    }
}
