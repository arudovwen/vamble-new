export default function currencyFormat(price) {
  let naira = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });
  return naira.format(price);
}
