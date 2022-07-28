import axios from "axios";

export default class CurrencyServise {
    static async getList() {
        const response = await axios.get('https://api.exchangerate.host/symbols');
        return response.data;
    }

    static async convert(from="USD", to="EUR", amount=100, places=5) {
        const response = await axios.get('https://api.exchangerate.host/convert', {
            params: {
                from,
                to,
                amount,
                places
            }
        });
        return response.data;
    }

    static async fluctuation(startDate, endDate, currentCodeFrom) {
        const response = await axios.get('https://api.exchangerate.host/fluctuation', {
            params: {
                start_date: startDate,
                end_date: endDate,
                base: currentCodeFrom
            }
        });
        return response.data;
    }
}