"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const Payment = () => {
    const [payment, setPayment] = useState({});
    console.log("🚀 ~ file: page.jsx:10 ~ Payment ~ payment:", payment)
    const api = process.env.API_ENDPOINT;
    const { userId } = useParams();

    useEffect(() => {
        loadPayment(userId);
    }, [userId])

    const loadPayment = (async (userId) => {
        const res = await axios.get(api + "informed/" + userId).then(res => {
            setPayment(res.data)
        })

    })
    return (
        <div>
            <img src={`https://promptpay.io/0942710120/${payment.grandTotal}.png`} />

        </div>
    )
}

export default Payment