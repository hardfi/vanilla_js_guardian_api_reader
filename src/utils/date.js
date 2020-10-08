export function subtractDays(date, days) {
    const tmpDate = new Date(Number(date));
    tmpDate.setDate(date.getDate() - days);
    return tmpDate;
}

export function formatDateForApi(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
