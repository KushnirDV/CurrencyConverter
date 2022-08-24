import {getSpecialDateFormat, getPreviousDay} from './time';

describe('check time functions', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('check time converting', () => {
        const date = new Date('Tue Aug 02 2022 17:57:57 GMT+0300 (EEST)');
        const spyGetDate = jest.spyOn(date, 'getDate');
        expect(getSpecialDateFormat(date)).toBe("2022-08-02");
        expect(spyGetDate).toHaveBeenCalledTimes(1);
    });

    test('check previous day function', () => {
        const date = getPreviousDay(new Date('Tue Aug 02 2022 17:57:57 GMT+0300 (EEST)'));
        expect(getSpecialDateFormat(date)).toBe("2022-08-01");
        expect(getSpecialDateFormat(date)).not.toBe("2022-08-02");
    });
});