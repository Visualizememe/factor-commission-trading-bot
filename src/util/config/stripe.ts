const stripeConfig = {
    subscriptionPriceId: "price_1ILBf2E3PATAwyWi2eYz6aMz",
    successUrl: "https://xnx.no/payment-success?sessionId={CHECKOUT_SESSION_ID}",
    cancelUrl: "https://xnx.no/payment-cancelled"
};

export default stripeConfig;
