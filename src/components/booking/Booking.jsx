import { Route, Routes, useNavigate } from "react-router-dom"
import React from 'react';
import { Bookingpage } from "./Bookingpage";
import { ReadBooking } from "./ReadBooking";
import { EditBooking } from "./EditBooking";
import { useSelector } from "react-redux";


export function Booking() {

    const navigate = useNavigate()
    const cartItem = useSelector((state) => state.Car.cartItem)
    return <>
        <div className="bookingpage">
            <div className="booking-nav">
                <button onClick={() => navigate("/zoomcar")} ><i className="fa fa-arrow-circle-left" aria-hidden="true"></i></button>
                <p>TRAVEL WITH US</p>
                <button onClick={() => {
                    if (cartItem.length !== 0) {
                        navigate("/booking/read-booking")
                    }
                    else {
                        navigate("/zoomcar")
                    }
                }} >BOOKINGS</button>
            </div>
            <Routes>
                <Route path="/" element={<Bookingpage />} />
                <Route path="/read-booking" element={<ReadBooking />} />
                <Route path="/edit-booking" element={<EditBooking />} />
            </Routes>
        </div>
    </>
}



