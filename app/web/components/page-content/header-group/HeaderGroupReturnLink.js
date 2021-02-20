import PropTypes from 'prop-types';

import {IconArrowLeft} from '../../icon/arrow-left/IconArrowLeft';
import {Link} from '../../link/Link';

import styles from './HeaderGroupReturnLink.module.scss';


export function HeaderGroupReturnLink({href, children}) {
    return (
        <div className={styles.root}>
            <Link href={href} className={styles.link}>
                <IconArrowLeft width={16} height={16} className={styles.icon} />
                {children}
            </Link>
        </div>
    );
}


HeaderGroupReturnLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string
};

HeaderGroupReturnLink.defaultProps = {
    children: 'Вернуться'
};
