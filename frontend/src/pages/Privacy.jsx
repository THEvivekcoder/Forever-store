import React from 'react'
import Title from '../components/Title'

const Privacy = () => {
    return (
        <div className="border-t pt-12 pb-20">

            <div className="text-center mb-14">
                <Title text1="PRIVACY" text2="POLICY" />

                <p className="max-w-2xl mx-auto mt-5 text-sm text-gray-500 leading-7">
                    Your privacy matters to us. This Privacy Policy explains
                    what information Forever collects, how we use it and
                    how we work to keep it secure.
                </p>

                <p className="text-xs text-gray-400 mt-3">
                    Last updated: August 2026
                </p>
            </div>


            <div className="max-w-4xl mx-auto px-5">

                <div className="space-y-10">

                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            1. Information We Collect
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            When you use our website, create an account or
                            place an order, we may collect information such
                            as your name, email address, phone number,
                            delivery address and order details.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            2. How We Use Your Information
                        </h2>

                        <ul className="space-y-3 text-sm text-gray-600 leading-7 list-disc pl-5">
                            <li>To create and manage your account.</li>
                            <li>To process and deliver your orders.</li>
                            <li>To communicate with you about your orders.</li>
                            <li>To provide customer support.</li>
                            <li>To improve our website and services.</li>
                            <li>To prevent fraud and unauthorised activity.</li>
                        </ul>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            3. Payment Information
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Online payments may be processed through third-party
                            payment providers such as Razorpay. Payment
                            providers process sensitive payment information
                            according to their own privacy and security
                            policies.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            We do not intentionally store your complete card
                            number, CVV, UPI PIN or banking password on our
                            servers.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            4. Third-Party Services
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We may use trusted third-party services to operate
                            our website, including payment providers, cloud
                            storage, analytics or hosting providers.
                        </p>

                        <p className="text-sm text-gray-600 leading-7 mt-3">
                            These providers may process information according
                            to their respective privacy policies.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            5. Cookies and Similar Technologies
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Our website may use cookies or similar technologies
                            to maintain sessions, remember preferences and
                            improve website functionality.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            6. Data Security
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We use reasonable technical and organisational
                            measures to protect customer information against
                            unauthorised access, alteration or disclosure.
                            However, no internet transmission or storage
                            system can be guaranteed to be completely secure.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            7. Data Retention
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            We retain information for as long as reasonably
                            necessary to provide our services, fulfil orders,
                            meet legal obligations and resolve disputes.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-xl font-medium mb-4">
                            8. Your Rights
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            Depending on applicable law, you may have rights
                            regarding your personal information, including
                            requesting access, correction or deletion of
                            certain information.
                        </p>
                    </section>


                    <section className="border-t pt-8">
                        <h2 className="text-xl font-medium mb-4">
                            9. Contact Us
                        </h2>

                        <p className="text-sm text-gray-600 leading-7">
                            For privacy-related questions or requests,
                            contact us at:
                        </p>

                        <p className="text-sm font-medium mt-3">
                            support@yourdomain.com
                        </p>
                    </section>

                </div>

            </div>
        </div>
    )
}

export default Privacy