export function numberToDollarFormat(number) {
    let dollarAmount = number;
    if (typeof number === 'string') {
        dollarAmount = parseFloat(number)
    }

    const formattedValue = dollarAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formattedValue;
}