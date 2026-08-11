import React from 'react'
import Title from '../components/Title'

const Shipping = () => {
    return (
        <div className="border-t pt-12 pb-20">

            <div className="text-center mb-14">
                <Title text1="SHIPPING" text2="POLICY" />

                <p className="max-w-2xl mx-auto mt-5 text-sm text-gray-500 leading-7">
                    Everything you need to know about how we process,
                    dispatch and deliver your Forever orders.
                </p>

                <p className="text-xs text-gray-400 mt-3">
                    Last updated: August 2026
                </p>
            </div>


            <div className="max-w-4xl mx-auto px-5">

                <div className="grid sm:grid-cols-3 gap-5 mb-14">

                    <div className="border p-6 text-center">
                        <p className="text-2xl mb-3">📦</p>
                        <h3 className="font-medium">
                            Fast Processing
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">
                            Orders are generally processed within
                            1–2 business days.
                        </p>
                    </div>


                    <div className="border p-6 text-center">
                        <p className="text-2xl mb-3">🚚</p>
                        <h3 className="font-medium">
                            Reliable Delivery
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">
                            Estimated delivery is generally
                            3–7 business days.
                        </p>
                    </div>


                    <div className="border p-6 text-center">
                        <p className="text-2xl mb-3">📍</p>
                        <h3 className="font-medium">
                            Order Tracking
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">
                            Tracking information may be provided
                            after dispatch.
                        </p>
                    </div>

                </div>


                <div className="space-y-10">

                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            1. Shipping Charges
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Applicable shipping charges will be displayed
                            during checkout before you confirm your order.
                            Shipping charges may vary depending on the
                            delivery location, order value and available
                            delivery services.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            2. Order Processing
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Orders are generally processed within
                            <strong> 1–2 business days</strong> after
                            successful order confirmation.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            Orders placed on weekends or public holidays
                            may be processed on the next business day.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            3. Estimated Delivery Time
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Standard delivery generally takes approximately
                            <strong> 3–7 business days</strong> after
                            dispatch. Delivery times may vary depending on
                            your location, courier availability, weather,
                            public holidays or other circumstances beyond
                            our control.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            4. Delivery Areas
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We currently aim to deliver orders to serviceable
                            locations within India. Delivery availability is
                            determined by the courier service and the
                            destination PIN code.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            5. Incorrect Address
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Customers are responsible for providing a complete
                            and accurate delivery address. Delays or failed
                            deliveries caused by incorrect or incomplete
                            information may not be the responsibility of
                            Forever.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            6. Failed Delivery
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            If a delivery attempt is unsuccessful, the courier
                            may make additional attempts or contact the
                            customer. If the order is returned to us after
                            unsuccessful delivery, please contact customer
                            support for further assistance.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            7. Delayed Orders
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            If your order has not arrived within the expected
                            delivery period, please contact us with your
                            order number so that we can investigate the
                            delivery status.
                        </p>
                    </section>


                    <section className="border-t pt-8">
                        <h2 className="text-xl font-medium mb-4">
                            Need Help?
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Contact our support team at
                            <strong> support@yourdomain.com</strong>.
                        </p>
                    </section>

                </div>

            </div>
        </div>
    )
}

export default Shipping