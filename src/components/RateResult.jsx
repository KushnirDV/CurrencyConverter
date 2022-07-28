import React from 'react';
import ChangeArrow from './ChangeArrow/ChangeArrow';

const RateResult = ({result, amount, currentCodeFrom, currentCodeTo, change}) => {
    return (
        <div className="exchange-result">
            <div className="exchange-from">
                {currentCodeFrom} {amount} =
            </div>
            <div className="exchange-to">
                {currentCodeTo} {result}
            </div>
            <ChangeArrow change={change} />
        </div>
    );
};

export default RateResult;