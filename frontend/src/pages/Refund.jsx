import React from 'react'
import Title from '../components/Title'

const Refund = () => {
    return (
        <div className="border-t pt-12 pb-20">

            <div className="text-center mb-14">
                <Title text1="CANCELLATION &" text2="REFUND" />

                <p className="max-w-2xl mx-auto mt-5 text-sm text-gray-500 leading-7">
                    Our cancellation and refund policy is designed to make
                    returns and refunds simple and transparent.
                </p>

                <p className="text-xs text-gray-400 mt-3">
                    Last updated: August 2026
                </p>
            </div>


            <div className="max-w-4xl mx-auto px-5">

                <div className="grid sm:grid-cols-3 gap-5 mb-14">

                    <div className="border p-6">
                        <p className="text-xs tracking-widest text-gray-400">
                            CANCELLATION
                        </p>

                        <h3 className="text-lg font-medium mt-2">
                            Before Dispatch
                        </h3>

                        <p className="text-sm text-gray-500 mt-3 leading-6">
                            Contact us as soon as possible if you wish
                            to cancel an eligible order.
                        </p>
                    </div>


                    <div className="border p-6">
                        <p className="text-xs tracking-widest text-gray-400">
                            RETURNS
                        </p>

                        <h3 className="text-lg font-medium mt-2">
                            Eligible Items
                        </h3>

                        <p className="text-sm text-gray-500 mt-3 leading-6">
                            Items must meet the applicable return
                            conditions described below.
                        </p>
                    </div>


                    <div className="border p-6">
                        <p className="text-xs tracking-widest text-gray-400">
                            REFUND
                        </p>

                        <h3 className="text-lg font-medium mt-2">
                            Secure Processing
                        </h3>

                        <p className="text-sm text-gray-500 mt-3 leading-6">
                            Approved refunds are processed through the
                            applicable payment method.
                        </p>
                    </div>

                </div>


                <div className="space-y-10">

                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            1. Order Cancellation
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            You may request cancellation of an order before
                            it has been dispatched. Once an order has been
                            dispatched, cancellation may no longer be possible
                            and the customer may need to follow the applicable
                            return process.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            2. Eligible Returns
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Unless otherwise stated for a specific product,
                            eligible clothing items should be unused,
                            unwashed and in their original condition with
                            original tags and packaging intact.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            Certain products may not be eligible for return
                            for hygiene, safety or other applicable reasons.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            3. Refund Conditions
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            A refund may be issued after the returned product
                            has been received and inspected and the return is
                            determined to meet our applicable conditions.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            4. Damaged or Incorrect Products
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            If you receive a damaged, defective or incorrect
                            product, please contact us as soon as possible
                            after delivery.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            Please provide your order number and clear
                            photographs of the product and packaging where
                            applicable. We will review the issue and provide
                            the appropriate resolution.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            5. Refund Processing Time
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Once a refund has been approved, the refund will
                            be initiated through the applicable payment
                            method. The time required for the amount to appear
                            in your account may depend on your bank or payment
                            provider.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            6. Shipping Charges
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Unless otherwise stated or required by applicable
                            law, original shipping charges may not be
                            refundable when an order is returned for reasons
                            unrelated to a product defect or fulfilment error.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            7. Exchange Requests
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            If exchanges are offered for a particular product,
                            availability will depend on the requested size,
                            colour and stock availability.
                        </p>
                    </section>


                    <section className="border-t pt-8">
                        <h2 className="text-xl font-medium mb-4">
                            Request a Cancellation or Refund
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Contact us with your order number and the reason
                            for your request:
                        </p>

                        <p className="font-medium mt-3">
                            support@yourdomain.com
                        </p>
                    </section>

                </div>

            </div>
        </div>
    )
}

export default Refund