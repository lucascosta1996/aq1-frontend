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
};

export function formatTimestampToDateString(timestamp) {
    // Convert Unix timestamp to milliseconds
  var date = new Date(timestamp * 1000);

  // Extract individual components of the date
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month as it is zero-indexed
  var day = ('0' + date.getDate()).slice(-2);

  // Return the formatted date
  return `${year}-${month}-${day}`;
}

export function formatTimestampDateNowToDateString(timestamp) {
    // Convert Unix timestamp to milliseconds
  var date = new Date(timestamp);

  // Extract individual components of the date
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month as it is zero-indexed
  var day = ('0' + date.getDate()).slice(-2);

  // Return the formatted date
  return `${year}-${month}-${day}`;
}