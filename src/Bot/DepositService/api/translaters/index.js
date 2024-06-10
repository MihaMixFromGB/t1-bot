export function translateDeposite(apiResponse) {
  return {
    productName: apiResponse.productName,
    minimumTerm: apiResponse.products[0].terms[0].minimumTerm,
    maxProfitRate: apiResponse.products[0].maxProfitRate,
    nominalRate: apiResponse.products[0].terms[0].rates[0].nominalRate,
  };
}
