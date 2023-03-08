const validate = (data) => {
  const errors = {};
  console.log(data);
  if (!data.donate) {
    errors.donate = "donate is required";
  }
  if (!data.management) {
    errors.management = "management is required";
  }
  if (!data.nft_winner_shares) {
    errors.nft_winner_shares = "nft_winner_shares is required";
  }

  if (!data.convert_fee) {
    errors.convert_fee = "convert_fee is required";
  }

  if (!data.cashout_fee) {
    errors.cashout_fee = "cashout_fee is required";
  }
  if (!data.enable_transfer) {
    errors.enable_transfer = "enable_transfer is required";
  }
  if (!data.max_qty_buy_nft) {
    errors.max_qty_buy_nft = "max_qty_buy_nft is required";
  }
  if (data.min_coins_buy_amount === 0) {
    errors.min_coins_buy_amount = "";
  } else if (!data.min_coins_buy_amount) {
    errors.min_coins_buy_amount = "min_coins_buy_amount is required";
  }
  if (!data.award_value) {
    errors.award_value = "award_value is required";
  }

  if (!data.months_of_declare_shares) {
    errors.months_of_declare_shares = "months_of_declare_shares is required";
  }

  return errors;
};
export default validate;
