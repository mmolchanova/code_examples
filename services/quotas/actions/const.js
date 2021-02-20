function prefix(ACTION) {
    return `quotas.${ACTION}`;
}

export const RESET_QUOTAS_VALUES = prefix('RESET_QUOTAS_VALUES');
export const REQUEST_QUOTAS_CONFIG_SAVE = prefix('REQUEST_QUOTAS_CONFIG_SAVE');
export const SET_QUOTAS_CONFIG = prefix('SET_QUOTAS_CONFIG');
export const SET_QUOTAS_DEFAULT_CONFIG = prefix('SET_QUOTAS_DEFAULT_CONFIG');
export const SET_QUOTAS_DEFAULT_VALUES = prefix('SET_QUOTAS_DEFAULT_VALUES');
export const TOGGLE_QUOTAS_DIALOG = prefix('TOGGLE_QUOTAS_DIALOG');
