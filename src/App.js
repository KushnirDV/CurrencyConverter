import React, {useState, useEffect} from 'react';
import CurrencyServise from './API/CurrencyServise';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';
import { useFetching } from './hooks/useFetching';
import useInput from './hooks/useInput';
import RateResult from './components/RateResult';
import { getPreviousDay, getSpecialDateFormat } from './utils/time';
import ChangeTools from './components/ChangeTools';
import useThrottle from './hooks/useThrottle';
import MainInput from './components/MainInput';

import './styles/App.css';

function App() {

    const [amount, setAmount] = useInput(100);
    const [currentCodeFrom, setCurrentCodeFrom] = useState('USD');
    const [currentCodeTo, setCurrentCodeTo] = useState('EUR');
    const [result, setResult] = useState(0);
    const [change, setChange] = useState(0);

    const date = new Date();
    const startDate = getSpecialDateFormat(date);
    const endDate = getSpecialDateFormat(getPreviousDay(date));

    const [fetchRate, rateError] = useFetching(async ([isCodeChanged=false]) => {
        const promisess = [CurrencyServise.convert(currentCodeFrom, currentCodeTo, amount)]
        if(!change || isCodeChanged) {
            promisess.push(CurrencyServise.fluctuation(startDate, endDate, currentCodeFrom));
        }
        Promise.all(promisess).then(list => {
            const [convert, fluctuation] = list;
            if((!change || isCodeChanged) && fluctuation.rates && fluctuation.rates[currentCodeTo]) {
                setChange(fluctuation.rates[currentCodeTo]['change']);
            }

            if(convert.result) {
                setResult(convert.result);
            }
        })
    });

    const throttleRate = useThrottle(fetchRate, 200);
  
    useEffect(() => {
        throttleRate(true);
    }, [currentCodeFrom, currentCodeTo]);

    useEffect(() => {
        throttleRate();
    }, [amount]);

    if(rateError) {
        return <ErrorBlock errorMessage={rateError} />
    }

    return (
        <div className="currency-wrapper">
            <div className="currency-block">
                <MainInput
                    amount={amount} 
                    setAmountOptimized={setAmount}
                />
                <ChangeTools 
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
}

export default App;
