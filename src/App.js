import React, {useState, useEffect} from 'react';
import CurrencyServise from './API/CurrencyServise';
import ChooseCurrency from './components/ChooseCurrency';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';
import Spiner from './components/UI/Spiner';
import { useFetching } from './hooks/useFetching';

import './styles/App.css';

function App() {
	const [currencyList, setCurrencyList] = useState([]);

    const [fetchCurrencies, curError, isCurLoading] = useFetching(async () => {
        const data = await CurrencyServise.getList();
        const list = Object.keys(data.symbols);
        setCurrencyList(list);
    });

	useEffect(() => {
        fetchCurrencies();
    }, []);

    if(isCurLoading) {
        return <Spiner />
    }

    if(curError) {
        return <ErrorBlock errorMessage={curError} />
    }
  
    return <ChooseCurrency currencyList={currencyList} />
}

export default App;
