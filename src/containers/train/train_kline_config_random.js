// 随机生成日期
function randomOneDate() {
    const date = new Date()
    const min = 3600 * 1000 * 24 * 200 // 200天那个时间节点
    const max = min + (3600 * 1000 * 24 * 365 * 2) // 200天那个时间点向前推5年，随机一个时间
    const randowDay = Math.floor(Math.random() * (max - min)) + min
    date.setTime(date.getTime() - randowDay)
    return date
}

// 随机生成股票
function randomOneStock(symbols) {
    const index = Math.floor(Math.random() * symbols.length)
    return symbols[index]
}

// 时间格式
// function stockformatDate(value = Date.now(), format = "Y-M-D h:m:s") {
//     const formatNumber = n => `0${n}`.slice(-2);
//     const date = new Date(value);
//     const formatList = ["Y", "M", "D", "h", "m", "s"];
//     const resultList = [];
//     resultList.push(date.getFullYear().toString());
//     resultList.push(formatNumber(date.getMonth() + 1));
//     resultList.push(formatNumber(date.getDate()));
//     resultList.push(formatNumber(date.getHours()));
//     resultList.push(formatNumber(date.getMinutes()));
//     resultList.push(formatNumber(date.getSeconds()));
//     for (let i = 0; i < resultList.length; i++) {
//         format = format.replace(formatList[i], resultList[i]);
//     }
//     return format;
// }

export { randomOneDate, randomOneStock }
