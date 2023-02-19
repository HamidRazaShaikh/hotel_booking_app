
import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const totalPrice = 1400; // this means 14 usd and can also be calculated at the backend








export const CheckoutForm = () => {
  
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
  
    // STEP 1: create a payment intent and getting the secret
    useEffect(() => {
      fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: totalPrice }),
      })
        .then(res => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);  // <-- setting the client secret here
        });
    }, []);
  
    // STEP 2: make the payment after filling the form properly
    const makePayment = async () => {
       const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
    }


    const handleChange = (e) => {
        e.preventDefault();
    
       console.log(e)
      };
  
    return (
      <form id="payment-form" onSubmit={makePayment}>
        <CardElement id="card-element" onChange={handleChange} />
        <button id="submit"> Pay Now </button>
      </form>
    );
  };