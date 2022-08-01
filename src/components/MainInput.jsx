import React from 'react';
import Input from './UI/input/Input';

const MainInput = ({amount, setAmountOptimized}) => {
    return (                
        <Input 
            type="number" 
            value={amount} 
            onChange={setAmountOptimized}
            className="currency-input"
        />
    )
}
const checkInput = (prev, current) => prev.amount === current.amount;
export default React.memo(MainInput, checkInput);