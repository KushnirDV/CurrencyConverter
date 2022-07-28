import React from 'react';
import classes from './Select.module.css';

const Select = ({options, value, onChange}) => {
    return (
        <select
            className={classes.select}
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {options.map(code => {
                return(
                    <option key={code} value={code}>
                        {code}
                    </option>
                )
            })}
        </select>
    );
};

export default Select;