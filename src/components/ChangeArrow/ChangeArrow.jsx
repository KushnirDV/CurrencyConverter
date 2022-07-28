import React from 'react';
import classes from './ChangeArrow.module.css';

const ChangeArrow = ({change}) => {
    if(change === 0) {
        return '';
    }
    const isPositive = change > 0;
    const getColor = () => isPositive ? 'green' : 'red';

    return (
        <div className={[classes[getColor()], classes.change].join(' ')}>
            {isPositive 
                ? <div>&uarr;</div> 
                : <div>&darr;</div>
            }
        </div>
    );
};

export default ChangeArrow;