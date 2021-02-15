const stripe = new Stripe("pk_test_51ILBKjE3PATAwyWiEHcP5b6MV18yAuonQBNENrjEtI8mTqA8afj2M3axECzfHgrUcF8gh0sBbpBLHfaMXDaQVgbn00QWBJ5JeN");

var createCheckoutSession = function (priceId) {
    return fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            priceId: priceId
        })
    }).then(result => result.json());
};

document
    .getElementById("checkout")
    .addEventListener("click", evt => {
        createCheckoutSession("price_1ILBf2E3PATAwyWi2eYz6aMz").then(data => {
            console.log(data);

            // Call Stripe.js method to redirect to the new Checkout page
            stripe
                .redirectToCheckout({
                    sessionId: data.createdCheckoutSession.id
                })
                .then(handleResult);
        });
    });
