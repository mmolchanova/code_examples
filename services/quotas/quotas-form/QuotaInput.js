import PropTypes from 'prop-types';

import {Form} from '../../../app/web/components/form/form/Form';
import {getFieldId} from '../fields';


export function QuotaInput({
    name,
    data,
    defaultData,
    addon,
    children
}) {
    return (
        <Form.InputRow
            id={getFieldId(name)}
            name={name}
            defaultValue={data[name]}
            rowType={'input-group'}
            addon={addon}
            inputMode={'numeric'}
            size={140}
            placeholder={defaultData[name]}
        >
            {children}
        </Form.InputRow>
    );
}

QuotaInput.propTypes = {
    name: PropTypes.string,
    data: PropTypes.object,
    defaultData: PropTypes.object,
    addon: PropTypes.node,
    children: PropTypes.node
};
