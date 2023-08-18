"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
    const [data, setData] = useState([]);
    const api = process.env.API_ENDPOINT;
    // console.log("🚀 ~ file: HomePage.jsx:8 ~ HomePage ~ api:", api)
    console.log("🚀 ~ file: HomePage.jsx:7 ~ HomePage ~ data:", data);

    useEffect(() => {
        loadata();
    }, []);
    
    const loadata = async () => {
        const res = await axios.get(api + "tickets").then((res) => {
            setData(res.data);
        });
    };

    

    return data.map((res, idx) => {
        return (
            <div key={idx} className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                    <img
                        alt="..."
                        className="max-w-full rounded-lg shadow-lg"
                        src="https://promptpay.io/0942710120/.png"
                    />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                    <div className="md:pr-12">
                        <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300 mt-8">
                            <i className="fas fa-rocket text-xl" />
                        </div>
                        <h3 className="text-3xl font-semibold">A growing company</h3>
                        <p
                            key={idx}
                            className="mt-4 text-lg leading-relaxed text-blueGray-500"
                        >
                            {res.ticketdesc}
                        </p>
                        <ul className="list-none mt-6">
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                            <i className="fas fa-fingerprint" />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-blueGray-500">
                                            Carefully crafted components
                                        </h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                            <i className="fab fa-html5" />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-blueGray-500">Amazing page examples</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                            <i className="far fa-paper-plane" />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-blueGray-500">Dynamic components</h4>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    });
};

export default HomePage;
