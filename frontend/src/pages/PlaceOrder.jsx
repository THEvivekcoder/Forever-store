import React, {
    useContext,
    useState
} from 'react'

import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

import {
    ShopContext
} from '../context/ShopContext'

import axios from 'axios'

import {
    toast
} from 'react-toastify'


const PlaceOrder = () => {

    // =====================================================
    // PAYMENT METHOD
    // =====================================================

    // Currently we accept only Cash on Delivery
    const [method] = useState('cod')


    // =====================================================
    // CONTEXT
    // =====================================================

    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products
    } = useContext(ShopContext)


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''

    })


    // =====================================================
    // FORM CHANGE HANDLER
    // =====================================================

    const onChangeHandler = (event) => {

        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({

            ...data,

            [name]: value

        }))
    }


    // =====================================================
    // SUBMIT ORDER
    // =====================================================

    const onSubmitHandler = async (event) => {

        event.preventDefault()


        try {

            // =================================================
            // CREATE ORDER ITEMS
            // =================================================

            let orderItems = []


            for (const items in cartItems) {

                for (const item in cartItems[items]) {

                    if (
                        cartItems[items][item] > 0
                    ) {

                        const itemInfo =
                            structuredClone(

                                products.find(
                                    product =>
                                        product._id === items
                                )

                            )


                        if (itemInfo) {

                            itemInfo.size = item

                            itemInfo.quantity =
                                cartItems[items][item]

                            orderItems.push(
                                itemInfo
                            )
                        }
                    }
                }
            }


            // =================================================
            // CHECK CART
            // =================================================

            if (orderItems.length === 0) {

                toast.error(
                    'Your cart is empty'
                )

                return
            }


            // =================================================
            // ORDER DATA
            // =================================================

            const orderData = {

                address: formData,

                items: orderItems,

                amount:
                    getCartAmount() +
                    delivery_fee

            }


            console.log(
                'ORDER DATA:'
            )

            console.log(
                orderData
            )


            // =================================================
            // PLACE COD ORDER
            // =================================================

            const response =
                await axios.post(

                    backendUrl +
                    '/api/order/place',

                    orderData,

                    {
                        headers: {
                            token
                        }
                    }

                )


            // =================================================
            // RESPONSE
            // =================================================

            if (
                response.data.success
            ) {

                toast.success(
                    'Order placed successfully!'
                )


                // Clear cart
                setCartItems({})


                // Navigate to orders
                navigate('/orders')


            } else {

                toast.error(

                    response.data.message ||
                    'Unable to place order'

                )
            }


        } catch (error) {

            console.log(
                'ORDER ERROR:'
            )

            console.log(
                error
            )


            toast.error(

                error.response?.data?.message ||
                error.message ||
                'Something went wrong while placing your order'

            )
        }
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <form
            onSubmit={onSubmitHandler}
            className='
                flex
                flex-col
                sm:flex-row
                justify-between
                gap-4
                pt-5
                sm:pt-14
                min-h-[80vh]
                border-t
            '
        >


            {/* =================================================
                DELIVERY INFORMATION
            ================================================= */}


            <div
                className='
                    flex
                    flex-col
                    gap-4
                    w-full
                    sm:max-w-[480px]
                '
            >


                <div
                    className='
                        text-xl
                        sm:text-2xl
                        my-3
                    '
                >

                    <Title
                        text1={'DELIVERY'}
                        text2={'INFORMATION'}
                    />

                </div>


                {/* FIRST NAME + LAST NAME */}

                <div className='flex gap-3'>

                    <input
                        required
                        onChange={onChangeHandler}
                        name='firstName'
                        value={formData.firstName}
                        className='
                            border
                            border-gray-300
                            rounded
                            py-1.5
                            px-3.5
                            w-full
                        '
                        type='text'
                        placeholder='First name'
                    />


                    <input
                        required
                        onChange={onChangeHandler}
                        name='lastName'
                        value={formData.lastName}
                        className='
                            border
                            border-gray-300
                            rounded
                            py-1.5
                            px-3.5
                            w-full
                        '
                        type='text'
                        placeholder='Last name'
                    />

                </div>


                {/* EMAIL */}

                <input
                    required
                    onChange={onChangeHandler}
                    name='email'
                    value={formData.email}
                    className='
                        border
                        border-gray-300
                        rounded
                        py-1.5
                        px-3.5
                        w-full
                    '
                    type='email'
                    placeholder='Email address'
                />


                {/* STREET */}

                <input
                    required
                    onChange={onChangeHandler}
                    name='street'
                    value={formData.street}
                    className='
                        border
                        border-gray-300
                        rounded
                        py-1.5
                        px-3.5
                        w-full
                    '
                    type='text'
                    placeholder='Street'
                />


                {/* CITY + STATE */}

                <div className='flex gap-3'>

                    <input
                        required
                        onChange={onChangeHandler}
                        name='city'
                        value={formData.city}
                        className='
                            border
                            border-gray-300
                            rounded
                            py-1.5
                            px-3.5
                            w-full
                        '
                        type='text'
                        placeholder='City'
                    />


                    <input
                        onChange={onChangeHandler}
                        name='state'
                        value={formData.state}
                        className='
                            border
                            border-gray-300
                            rounded
                            py-1.5
                            px-3.5
                            w-full
                        '
                        type='text'
                        placeholder='State'
                    />

                </div>


                {/* ZIPCODE + COUNTRY */}

                <div className='flex gap-3'>

                    <input
                        required
                        onChange={onChangeHandler}
                        name='zipcode'
                        value={formData.zipcode}
                        className='
                            border
                            border-gray-300
                            rounded
                            py-1.5
                            px-3.5
                            w-full
                        '
                        type='text'
                        inputMode='numeric'
                        placeholder='Zipcode'
                    />


                    <input
                        required
                        onChange={onChangeHandler}
                        name='country'
                        value={formData.country}
                        className='
                            border
                            border-gray-300
                            rounded
                            py-1.5
                            px-3.5
                            w-full
                        '
                        type='text'
                        placeholder='Country'
                    />

                </div>


                {/* PHONE */}

                <input
                    required
                    onChange={onChangeHandler}
                    name='phone'
                    value={formData.phone}
                    className='
                        border
                        border-gray-300
                        rounded
                        py-1.5
                        px-3.5
                        w-full
                    '
                    type='tel'
                    inputMode='numeric'
                    placeholder='Phone'
                />

            </div>


            {/* =================================================
                ORDER SUMMARY + PAYMENT
            ================================================= */}


            <div className='mt-8'>


                {/* CART TOTAL */}

                <div className='mt-8 min-w-80'>

                    <CartTotal />

                </div>


                {/* PAYMENT METHOD */}

                <div className='mt-12'>


                    <Title
                        text1={'PAYMENT'}
                        text2={'METHOD'}
                    />


                    {/* =================================================
                        TECHNICAL GLITCH MESSAGE
                    ================================================= */}

                    <div
                        className='
                            border
                            border-yellow-300
                            bg-yellow-50
                            rounded
                            p-4
                            mt-4
                        '
                    >

                        <p
                            className='
                                text-sm
                                text-yellow-800
                                font-medium
                            '
                        >
                            Online payments are temporarily unavailable.
                        </p>


                        <p
                            className='
                                text-sm
                                text-yellow-700
                                mt-1
                            '
                        >
                            Due to a technical issue, we are currently
                            accepting only Cash on Delivery orders.
                        </p>

                    </div>


                    {/* =================================================
                        CASH ON DELIVERY
                    ================================================= */}

                    <div
                        className='
                            flex
                            items-center
                            gap-3
                            border
                            border-green-500
                            p-3
                            px-4
                            mt-4
                        '
                    >

                        <p
                            className='
                                min-w-3.5
                                h-3.5
                                border
                                border-green-500
                                rounded-full
                                bg-green-400
                            '
                        />


                        <p
                            className='
                                text-gray-700
                                text-sm
                                font-medium
                                mx-2
                            '
                        >
                            CASH ON DELIVERY
                        </p>

                    </div>


                    {/* =================================================
                        PLACE ORDER BUTTON
                    ================================================= */}

                    <div
                        className='
                            w-full
                            text-end
                            mt-8
                        '
                    >

                        <button
                            type='submit'
                            className='
                                bg-black
                                text-white
                                px-16
                                py-3
                                text-sm
                            '
                        >
                            PLACE ORDER
                        </button>

                    </div>

                </div>

            </div>

        </form>

    )
}


export default PlaceOrder
