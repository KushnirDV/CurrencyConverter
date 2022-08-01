import React, {memo} from 'react';
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

// const isChanged = (prevProps, currentProps) => prevProps.change === currentProps.change;  

export default memo(ChangeArrow);