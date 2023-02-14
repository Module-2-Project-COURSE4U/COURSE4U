function simulatePaymentProcessing() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const paymentSuccessful = true; // Change this to `false` to simulate a failed payment
        if (paymentSuccessful) {
          resolve();
        } else {
          reject(new Error("Payment failed"));
        }
      }, 2000); // Simulate a 2 second delay in payment processing
    });
  }
  
  module.exports = { simulatePaymentProcessing };