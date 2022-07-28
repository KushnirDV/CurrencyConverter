import React, {useState, useEffect} from 'react';
import CurrencyServise from '../API/CurrencyServise';
import { useFetching } from '../hooks/useFetching';
import useInput from '../hooks/useInput';
import RateResult from './RateResult';
import Input from './UI/input/Input';
import ErrorBlock from './ErrorBlock/ErrorBlock';
import { getPreviousDay, getSpecialDateFormat } from '../utils/time';
import ChangeTools from './ChangeTools';

const ChooseCurrency = ({currencyList}) => {
    const [amount, setAmount] = useInput(100);
    const [currentCodeFrom, setCurrentCodeFrom] = useState('USD');
    const [currentCodeTo, setCurrentCodeTo] = useState('EUR');
    const [result, setResult] = useState(0);
    const [change, setChange] = useState(0);

    const date = new Date();
    const startDate = getSpecialDateFormat(date);
    const endDate = getSpecialDateFormat(getPreviousDay(date));

    const [fetchRate, rateError] = useFetching(async () => {
        Promise.all([
            CurrencyServise.convert(currentCodeFrom, currentCodeTo, amount),
            CurrencyServise.fluctuation(startDate, endDate, currentCodeFrom)
        ]).then(list => {
            const [convert, fluctuation] = list;
            if(fluctuation.rates && fluctuation.rates[currentCodeTo]) {
                setChange(fluctuation.rates[currentCodeTo]['change']);
            }
            if(convert.result) {
                setResult(convert.result);
            }
        })
    });
  
    useEffect(() => {
        fetchRate();
    }, [currentCodeFrom, currentCodeTo, amount]);

    if(rateError) {
        return <ErrorBlock errorMessage={rateError} />
    }

    return (
        <div className="currency-wrapper">
            <div className="currency-block">
                <Input 
                    type="number" 
                    value={amount} 
                    onChange={setAmount}
                    className="currency-input"
                />
                <ChangeTools 
                    currencyList={currencyList}
                    currentCodeFrom={currentCodeFrom}
                    setCurrentCodeFrom={setCurrentCodeFrom}
                    currentCodeTo={currentCodeTo}
                    setCurrentCodeTo={setCurrentCodeTo}
                />
            </div>
            <RateResult 
                result={result} 
                amount={amount} 
                currentCodeFrom={currentCodeFrom} 
                currentCodeTo={currentCodeTo} 
                change={change} 
            />
        </div>
    );
};

export default ChooseCurrency;