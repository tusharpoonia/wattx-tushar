export const roundUp = number => parseFloat(number.toFixed(2));

export const formatNumber = number => roundUp(number).toLocaleString();