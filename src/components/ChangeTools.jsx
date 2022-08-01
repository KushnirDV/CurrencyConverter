import React, {useState, useEffect} from 'react';
import Select from './UI/select/Select';
import Button from './UI/button/Button';
import { useFetching } from '../hooks/useFetching';
import CurrencyServise from '../API/CurrencyServise';
import ErrorBlock from './ErrorBlock/ErrorBlock';
import Spiner from './UI/Spiner';

const ChangeTools = ({currentCodeFrom, setCurrentCodeFrom, currentCodeTo, setCurrentCodeTo}) => {
	const [currencyList, setCurrencyList] = useState([]);

    const [fetchCurrencies, curError, isCurLoading] = useFetching (async () => {
        const data = await CurrencyServise.getList();
        const list = Object.keys(data.symbols);
        setCurrencyList(list);
    });

	useEffect(() => {
        fetchCurrencies();
    }, []);

    const swapHanler = () => {
        setCurrentCodeFrom(currentCodeTo);
        setCurrentCodeTo(currentCodeFrom);
    }

    if(isCurLoading) {
        return <Spiner />
    }

    if(curError) {
        return <ErrorBlock errorMessage={curError} />
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

export default React.memo(ChangeTools);