import React from 'react';
import classes from './ErrorBlock.module.css';

const ErrorBlock = ({errorMessage}) => {
    return (
        <div>
            <h1 className={classes.head}>
                Currency convernter service is not available. Try again later.
            </h1>
            <div>Error message:</div>
            <div>{errorMessage}</div>
        </div>
    );
};

export default ErrorBlock;