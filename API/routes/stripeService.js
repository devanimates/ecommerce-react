
const stripe = require("stripe")(process.env.STRIPE_KEY);

const createCharge = (tokenId, amount) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create(
      {
        source: tokenId,
        amount: amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          reject(stripeErr);
        } else {
          resolve(stripeRes);
        }
      }
    );
  });
};

module.exports = {
  createCharge,
};