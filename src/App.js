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

    return 'HI';








    // palindrome(6,4) => [11,22,33,44]
    // palindrome(59,3) => [66,77,88]
    // palindrome(101,2) => [101,111]
    // palindrome("15651",5) => "Not valid"
    // palindrome(1221,"8") => "Not valid"

    // const isPalindrome = num => {
    //     const arrNum = num.toString().split('');
    //     const reverseNum = arrNum.reverse().join('');
    //     return reverseNum.length > 1 && num === +reverseNum;
    // }

    // const resp = [];

    // const palindrome = (num, s) => {
    //     if(!Number.isInteger(num)) {
    //         return "Not valid"
    //     }
    //     do{
    //         if(isPalindrome(num)) {
    //             resp.push(num);
    //         }
    //         num += 1;
    //     } while(resp.length < s);

    //     return resp;
    // }

    // console.log(palindrome(101, 2));

    // function spy(func) {
    //     this.calls = [];
    //     return (...args) => {
    //       this.calls.push(args.join(','));
    //       func(args);
    //     }
    //   }

    return (<div></div>)
}

function AppBasic() {

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
