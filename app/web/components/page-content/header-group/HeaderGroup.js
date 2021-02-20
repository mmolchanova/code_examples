import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './HeaderGroup.module.scss';
import {HeaderGroupHeader} from './HeaderGroupHeader';
import {HeaderGroupReturnLink} from './HeaderGroupReturnLink';
import {HeaderGroupSubHeader} from './HeaderGroupSubHeader';


export function HeaderGroup({children, className, alwaysVisible}) {
    return (
        <header
            className={classNames(styles.root, className, {
                [styles.stateAlwaysVisible]: alwaysVisible
            })}
        >
            {children}
        </header>
    );
}

HeaderGroup.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    alwaysVisible: PropTypes.bool
};

HeaderGroup.Header = HeaderGroupHeader;
HeaderGroup.SubHeader = HeaderGroupSubHeader;
HeaderGroup.ReturnLink = HeaderGroupReturnLink;
