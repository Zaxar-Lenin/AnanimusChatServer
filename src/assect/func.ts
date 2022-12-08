export const Time = () => {
    const date = new Date()
    const countTime = (value: number) => value < 10 ? `0${value}` : value
    return countTime(date.getHours()) + ":" + countTime(date.getMinutes()) + " " + countTime(date.getDate()) + '.' + countTime(date.getMonth()) + '.' + date.getFullYear();
}