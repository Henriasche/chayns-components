export const getTimeStringMinutes = (timeStr) => {
    const regexRes = new RegExp('[0-9]{2}:[0-9]{2}').exec(timeStr)[0];
    const parts = regexRes.split(':');

    const hours = parseInt(parts[0], 0);
    const minutes = parseInt(parts[1], 0);
    const totalMin = hours * 60 + minutes;

    return totalMin;
};

export const getTimeStringFromMinutes = (total) => {
    const totalMinutes = total > 24 * 60 ? total - 24 * 60 : total;

    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes - hours * 60;

    if (hours === 24) hours = 0;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
