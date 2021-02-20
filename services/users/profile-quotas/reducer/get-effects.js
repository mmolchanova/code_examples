import {
    REQUEST_QUOTAS_CONFIG_SAVE
} from '../../../quotas/actions/const';


export function getEffects(controller) {
    return {
        async [REQUEST_QUOTAS_CONFIG_SAVE](dispatch, payload) {
            try {
                await controller.changeQuotasConfig(payload);

                controller.api.layout.showSuccess(
                    'Настройки квот сохранены'
                );
            } catch (ex) {
                if (controller.destroyed) {
                    return;
                }

                controller.api.layout.showError(
                    'Не удалось сохранить настройки квот'
                );
            }
        }
    };
}
