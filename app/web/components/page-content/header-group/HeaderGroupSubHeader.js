import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './HeaderGroupSubheader.module.scss';


export function HeaderGroupSubHeader({
    textStyle,
    className,
    children
}) {
    const Component = textStyle ?
        'p' :
        'div';

    return (
        <Component className={classNames(className, styles.root, {
            [styles.text]: textStyle
        })}>
            {children}
        </Component>
    );
}

HeaderGroupSubHeader.propTypes = {
    children: PropTypes.node.isRequired,
    textStyle: PropTypes.bool,
    className: PropTypes.string
};

HeaderGroupSubHeader.defaultProps = {
    textStyle: true
};
