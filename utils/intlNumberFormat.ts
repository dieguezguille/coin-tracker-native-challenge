function intlNumberFormat(
  number = 0,
  style = "currency",
  locale = "en-US",
  currency = "USD"
) {
  const absNumber = Math.abs(number);
  const units = ["", "K", "M", "B", "T"];
  let unitIndex = 0;
  let num = absNumber;

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  const formattedNumber = num.toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const formattedCurrency = new Intl.NumberFormat(locale, {
    style,
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(formattedNumber));

  return `${formattedCurrency}${units[unitIndex]}`;
}

export default intlNumberFormat;
