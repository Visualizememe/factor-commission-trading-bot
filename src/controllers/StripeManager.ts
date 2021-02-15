import Stripe from "stripe";
import config from "../util/config";


export default class StripeManager {
    public static client: Stripe | null = null;

    public static init () {
        StripeManager.client = new Stripe(config.secretsConfig.stripeSecretKey, {
            apiVersion: "2020-08-27"
        });
    }

    public static createPortalSession (customerId: string) {
        return StripeManager.client!.billingPortal.sessions.create({
            customer: customerId
        });
    }

    public static async cancelCustomerSubscription (customerId: string) {
        const activeSubscription = await StripeManager.getCustomerSubscription(customerId);

        if (!activeSubscription) {
            return null;
        }

        // TODO: TEST SUBSCRIPTION END AND MAKE SURE IT ENDS AT INVOICE END
        return StripeManager.client!.subscriptions.update(
            activeSubscription.id,
            {
                cancel_at_period_end: true
            }
        );
    }

    public static async verifyEvent (body: any, signature: string, signKey: string) {
        return StripeManager.client!.webhooks.constructEvent(body, signature, signKey);
    }

    public static createCheckoutSession (customerId: string, priceId: string) {
        return StripeManager.client!.checkout.sessions.create({
            mode: "subscription",
            customer: customerId,
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: config.stripeConfig.successUrl,
            cancel_url: config.stripeConfig.cancelUrl
        });
    }

    public static async getCustomerSubscription (customerId: string) {
        const customerSubscriptions = await StripeManager.client!.subscriptions.list({
            customer: customerId,
            status: "all"
        });

        return customerSubscriptions.data
            .find(data => data.status === "active" || !data.ended_at);
    }

    public static getCustomer (customerId: string) {
        return StripeManager.client!.customers.retrieve(
            customerId
        );
    }

    public static createCustomer (discordUserId: string, email: string) {
        return StripeManager.client!.customers.create({
            email,
            metadata: {
                discordUserId
            }
        });
    }
}
