"use client";
import React, { useRef, useState } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Cookies from "js-cookie";
import styles from "../page.module.css";

function Login({ setUser }) {
  const [showOTP, setShowOTP] = useState(false);
  const ph = useRef();
  const otp = useRef();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    console.log(ph.current.value);
    const formatPh = "+91" + ph.current.value;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        console.log("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp.current.value)
      .then(async (res) => {
        const loggedInResponse = await fetch("api/firebase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(res),
        });
        const loggedIn = await loggedInResponse.json();
        console.log(loggedIn);
        const jwtToken = loggedIn.jwtAccess;
        const mobile = loggedIn.mobile;
        Cookies.set("jwt", jwtToken, { expires: 20 });
        Cookies.set("mob", mobile, { expires: 20 });
        setUser([jwtToken, mobile]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section>
      <div>
        <div id="recaptcha-container"></div>

        <div>
          {showOTP ? (
            <div className={styles.phone_input}>
              <input
                className={styles.ph_input}
                placeholder="Enter Otp"
                ref={otp}
                type="text"
                name="otp"
                defaultValue=""
              />
              <button className={styles.phone_button} onClick={onOTPVerify}>
                Verify OTP
              </button>
            </div>
          ) : (
            <section className={styles.phone_input}>
              <input
                type="text"
                ref={ph}
                placeholder="PhoneNumber"
                className={styles.ph_input}
                name="mobile"
              />

              <button onClick={onSignup} className={styles.phone_button}>
                Send Otp
              </button>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
