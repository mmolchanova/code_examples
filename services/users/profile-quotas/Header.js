import PropTypes from 'prop-types';

import {useRoute} from '../../../app/web/router/react/use-route';
import {connect} from '../../../app/web/components/state-manange';
import {PureProfileHeader} from '../base/PureProfileHeader';


function PureHeader({username}) {
    const profileUrl = useRoute('users:profile', {
        userName: username
    });

    return (
        <PureProfileHeader
            title={`Размеры ящика ${username}`}
            returnLink={profileUrl}
        />
    );
}

PureHeader.propTypes = {
    username: PropTypes.string
};

function mapStateToProps(state) {
    return {
        username: state.user.username
    };
}

export const Header = connect(mapStateToProps)(PureHeader);
