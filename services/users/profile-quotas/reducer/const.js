function prefix(action) {
    return `user-quotas.${action}`;
}


export const ACTION_SAVE_USER = prefix('SAVE_USER');
