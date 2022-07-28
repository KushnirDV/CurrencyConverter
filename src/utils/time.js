export const getSpecialDateFormat = date => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${yyyy}-${mm}-${dd}`;
}
export const getPreviousDay = (date = new Date()) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
}