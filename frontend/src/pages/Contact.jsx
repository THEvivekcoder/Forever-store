import React from 'react'
import Title from '../components/Title'

const Contact = () => {
    return (
        <div className="border-t pt-12 pb-20">

            {/* Header */}

            <div className="text-center mb-14">
                <Title text1="CONTACT" text2="US" />

                <p className="max-w-2xl mx-auto mt-5 text-sm text-gray-500 leading-7">
                    Have a question about an order, product or delivery?
                    Our team would love to hear from you.
                </p>
            </div>


            <div className="max-w-5xl mx-auto px-5">

                <div className="grid md:grid-cols-2 gap-12">


                    {/* LEFT */}

                    <div>

                        <p className="text-xs tracking-[0.25em] text-gray-400 mb-3">
                            GET IN TOUCH
                        </p>

                        <h2 className="text-3xl font-medium">
                            We're here to help.
                        </h2>

                        <p className="text-sm text-gray-500 leading-7 mt-5">
                            Whether you have a question about your order,
                            need help choosing a product or want to know
                            more about our services, feel free to contact us.
                        </p>


                        <div className="mt-10 space-y-7">


                            {/* EMAIL */}

                            <div className="flex gap-5">

                                <div className="w-11 h-11 border flex items-center justify-center">
                                    ✉
                                </div>

                                <div>

                                    <p className="text-xs tracking-widest text-gray-400">
                                        EMAIL
                                    </p>

                                    <p className="font-medium mt-1">
                                       vivekop8825@gmail.com
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        We usually respond within 24–48 hours.
                                    </p>

                                </div>

                            </div>


                            {/* PHONE */}

                            <div className="flex gap-5">

                                <div className="w-11 h-11 border flex items-center justify-center">
                                    ☎
                                </div>

                                <div>

                                    <p className="text-xs tracking-widest text-gray-400">
                                        PHONE
                                    </p>

                                    <p className="font-medium mt-1">
                                        +91 8825156176
                                    </p>

                                </div>

                            </div>


                            {/* ADDRESS */}

                            <div className="flex gap-5">

                                <div className="w-11 h-11 border flex items-center justify-center">
                                    📍
                                </div>

                                <div>

                                    <p className="text-xs tracking-widest text-gray-400">
                                        ADDRESS
                                    </p>

                                    <p className="font-medium mt-1 leading-6">
                                        Bhauti
                                        <br />
                                        Kanpur, Uttarpradesh,
                                        <br />
                                        India
                                    </p>

                                </div>

                            </div>


                            {/* HOURS */}

                            <div className="flex gap-5">

                                <div className="w-11 h-11 border flex items-center justify-center">
                                    ◷
                                </div>

                                <div>

                                    <p className="text-xs tracking-widest text-gray-400">
                                        SUPPORT HOURS
                                    </p>

                                    <p className="font-medium mt-1">
                                        Monday – Saturday
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        10:00 AM – 6:00 PM IST
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT CONTACT CARD */}

                    <div className="border p-8 sm:p-10">

                        <p className="text-xs tracking-[0.25em] text-gray-400">
                            CUSTOMER SUPPORT
                        </p>

                        <h2 className="text-2xl font-medium mt-3">
                            How can we help?
                        </h2>

                        <div className="mt-8 space-y-4">


                            <div className="border p-5">
                                <p className="font-medium">
                                    Order Support
                                </p>

                                <p className="text-sm text-gray-500 mt-2 leading-6">
                                    Questions about an existing order,
                                    delivery or payment?
                                </p>
                            </div>


                            <div className="border p-5">
                                <p className="font-medium">
                                    Product Questions
                                </p>

                                <p className="text-sm text-gray-500 mt-2 leading-6">
                                    Need help with sizing, availability
                                    or product information?
                                </p>
                            </div>


                            <div className="border p-5">
                                <p className="font-medium">
                                    Returns & Refunds
                                </p>

                                <p className="text-sm text-gray-500 mt-2 leading-6">
                                    Contact us regarding an eligible
                                    cancellation, return or refund.
                                </p>
                            </div>

                        </div>


                        <a
                            href="mailto:support@yourdomain.com"
                            className="block text-center bg-black text-white py-4 mt-8 text-sm hover:opacity-80 transition"
                        >
                            EMAIL CUSTOMER SUPPORT
                        </a>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Contact