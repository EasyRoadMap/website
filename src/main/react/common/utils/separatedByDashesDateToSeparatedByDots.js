const addInsignificantZero = (num) => {
    return num < 10 ? "0" + num : num;
}

export const transformDate = (strDate) => {
    const date = new Date(strDate);
    const year = date.getYear() - 100;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${addInsignificantZero(day)}.${addInsignificantZero(month)}.${addInsignificantZero(year)}`
}