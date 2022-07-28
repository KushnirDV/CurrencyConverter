import React from 'react';
import Select from './UI/select/Select';
import Button from './UI/button/Button';

const ChangeTools = ({currencyList, currentCodeFrom, setCurrentCodeFrom, currentCodeTo, setCurrentCodeTo}) => {
    const swapHanler = () => {
        setCurrentCodeFrom(currentCodeTo);
        setCurrentCodeTo(currentCodeFrom);
    }

    return (
        <div className="tool-container">
            <Select 
                options={currencyList} 
                value={currentCodeFrom} 
                onChange={setCurrentCodeFrom}>
            </Select>
            <Button onClick={swapHanler}>&#8644;</Button>
            <Select 
                options={currencyList} 
                value={currentCodeTo} 
                onChange={setCurrentCodeTo}>
            </Select>
        </div>
    );
};

export default ChangeTools;