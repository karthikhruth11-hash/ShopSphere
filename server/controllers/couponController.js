// Sample active coupons (you can store these in MongoDB later)
const coupons = {
  SAVE10: 10,  // 10% off
  WELCOME20: 20 // 20% off
};

const validateCoupon = (req, res) => {
  const { code } = req.body;
  const discount = coupons[code?.toUpperCase()];

  if (discount) {
    res.json({ success: true, code: code.toUpperCase(), discount });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or expired coupon code' });
  }
};

module.exports = { validateCoupon };