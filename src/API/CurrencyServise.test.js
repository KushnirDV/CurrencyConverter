import CurrencyServise from './CurrencyServise';
import axios from 'axios';

jest.mock('axios');

describe('check API', () => {
    let response;
    beforeEach(() => {
        response = {
            data: {
                symbols: {
                    "AED": {
                        "description": "United Arab Emirates Dirham",
                        "code": "AED"
                    },
                    "AFN": {
                        "description": "Afghan Afghani",
                        "code": "AFN"
                    },
                    "ALL": {
                        "description": "Albanian Lek",
                        "code": "ALL"
                    }
                }
            }
        }
    });
    test('check getting data', async () => {
        axios.get.mockReturnValue(response);
        const result = await CurrencyServise.getList();
        expect(axios.get).toBeCalledTimes(1);
        expect(result.symbols).toEqual(response.data.symbols);
    });
});