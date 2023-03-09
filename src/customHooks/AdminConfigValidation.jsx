const validate = (data) => {
  const errors = {};
  if (!data.donate) {
    errors.donate = "donate is required";
  }
  if (!data.management) {
    errors.management = "management is required";
  }
  if (!data.nft_winner_shares) {
    errors.nft_winner_shares = "Nft winner shares is required";
  }

  if (!data.convert_fee) {
    errors.convert_fee = "Convert fee is required";
  }

  if (!data.cashout_fee) {
    errors.cashout_fee = "Cashout fee is required";
  }
  if (!data.enable_transfer) {
    errors.enable_transfer = "Enable transfer is required";
  }
  if (!data.max_qty_buy_nft) {
    errors.max_qty_buy_nft = "Max Quantity buy nft is required";
  }
  if (data.min_coins_buy_amount === 0) {
    errors.min_coins_buy_amount = "";
  } else if (!data.min_coins_buy_amount) {
    errors.min_coins_buy_amount = "Min coins buy amount is required";
  }
  if (!data.award_value) {
    errors.award_value = "Award value is required";
  }

  if (!data.months_of_declare_shares) {
    errors.months_of_declare_shares = "Months of declare shares is required";
  }

  return errors;
};
export default validate;
