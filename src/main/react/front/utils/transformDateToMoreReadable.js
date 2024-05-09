const monthsNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
]

export const beautifyDate = (strDate) => {
    if (!strDate) return "";

    const date = new Date(strDate);

    const year = date.getFullYear();
    const month = monthsNames[date.getMonth()];
    const day = date.getDate();

    return `${day} ${month} ${year}`;
}