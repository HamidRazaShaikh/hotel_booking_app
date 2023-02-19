import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";



export function CheckoutForm({data}) {



  const {Name , Country , ID, amount } = data



  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret); // <-- setting the client secret here
      });
  }, []);

  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: Name,
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Success!");
      }
    }
  };

  return (
    <div
      style={{
        padding: "1rem 1rem",
        marginBottom: '4rem'
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
         <fieldset style = {{border: '1px solid grey', borderRadius: '1rem', padding : '1.5rem'}}>
    <legend style = {{position : 'relative' , top: '-2.6rem', backgroundColor: '#fff', width: 'fit-content'}}>Payment</legend>
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit={payMoney}
        >

<p>Client Information</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >

            <input placeholder = {`Client Name : ${Name}`} className="cardS" disabled style ={{marginBottom : 10}}/>
            <input placeholder = {`Client Country : ${Country}`} className="cardS" disabled style ={{marginBottom : 10}}/>
             <input placeholder = {`Client Amount : $${amount}`} className="cardS" disabled style ={{marginBottom : 10}}/>
             <p>Enter your card credientials</p>
            <CardElement
              className="cardS"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />
            <button className="pay-button" disabled={isPaymentLoading}>
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
        </fieldset>
      </div>
    </div>
  );
}
