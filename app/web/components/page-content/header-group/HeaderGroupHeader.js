import PropTypes from 'prop-types';

import {Typography} from '../../typography/Typography';

import styles from './HeaderGroupHeader.module.scss';


export function HeaderGroupHeader({children}) {
    return (
        <Typography
            variant={'h2'}
            className={styles.root}
        >
            {children}
        </Typography>
    );
}

HeaderGroupHeader.propTypes = {
    children: PropTypes.node.isRequired
};

HeaderGroupHeader.displayName = 'HeaderGroup.Header';
