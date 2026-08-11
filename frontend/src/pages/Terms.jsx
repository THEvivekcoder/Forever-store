import React from 'react'
import Title from '../components/Title'

const Terms = () => {
    return (
        <div className="border-t pt-12 pb-20">

            {/* Header */}
            <div className="text-center mb-14">
                <Title text1="TERMS &" text2="CONDITIONS" />

                <p className="max-w-2xl mx-auto mt-5 text-sm text-gray-500 leading-7">
                    Welcome to Forever. These Terms & Conditions explain the
                    rules and conditions that apply when you use our website
                    and purchase our products.
                </p>

                <p className="text-xs text-gray-400 mt-3">
                    Last updated: August 2026
                </p>
            </div>


            <div className="max-w-4xl mx-auto px-5">

                <div className="space-y-10">

                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            1. About Forever
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Forever is an online fashion store offering
                            clothing and related products through this
                            website. By accessing or using our website,
                            you agree to comply with these Terms & Conditions.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            2. Use of Our Website
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            You agree to use this website only for lawful
                            purposes. You must not attempt to interfere with
                            the operation or security of the website, misuse
                            another customer's account, or use the website
                            for fraudulent activities.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            3. Products and Orders
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We make reasonable efforts to display product
                            descriptions, images, sizes and availability
                            accurately. However, minor differences in colour
                            or appearance may occur depending on your device
                            display.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            Placing an order constitutes an offer to purchase.
                            We reserve the right to cancel an order in cases
                            such as incorrect pricing, product unavailability,
                            suspected fraudulent activity or technical errors.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            4. Pricing
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            All prices displayed on the website are in Indian
                            Rupees (₹), unless otherwise stated. Product
                            prices, offers and availability may change without
                            prior notice.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            Any applicable delivery charges or additional
                            charges will be displayed before you complete
                            your purchase.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            5. Payments
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We may provide payment methods such as Cash on
                            Delivery and online payment through authorised
                            payment providers such as Razorpay.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            Payment information is processed by the relevant
                            payment provider. Forever does not store your
                            complete card, UPI or banking credentials on our
                            servers.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            6. User Responsibilities
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            You are responsible for providing accurate
                            information when creating an account or placing
                            an order, including your name, email address,
                            phone number and delivery address.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            You are also responsible for maintaining the
                            confidentiality of your account credentials.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            7. Intellectual Property
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            All website content, including logos, graphics,
                            photographs, text, design elements and other
                            materials, belongs to Forever or its respective
                            licensors and may not be reproduced without
                            permission.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            8. Limitation of Liability
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We take reasonable measures to keep our website
                            available and secure. However, we cannot guarantee
                            uninterrupted access or that the website will
                            always be free from technical issues.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            9. Changes to These Terms
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We may update these Terms & Conditions from time
                            to time. Any updated version will be published
                            on this page with a revised effective date.
                        </p>
                    </section>


                    <section className="border-t pt-8">
                        <h2 className="text-xl font-medium mb-4">
                            10. Contact
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            If you have questions about these Terms &
                            Conditions, please contact us through our
                            Contact Us page.
                        </p>
                    </section>

                </div>

            </div>
        </div>
    )
}

export default Terms