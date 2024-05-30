"use client";
import React, { useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
function Form() {
  const router = useRouter();
  const names = useRef();
  const email = useRef();
  const date = useRef();
  const nam = useRef();

  async function handleSubmit() {
    const data = {
      names: names.current.value,
      email: email.current.value,
      date: date.current.value,
      nam: nam.current.value,
      mobile: user[1],
    };
    const loggedInResponse = await fetch(
      "https://happiebirthday.onrender.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify(data),
      }
    );
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    router.push("/");
  }
  return (
    <>
      <div className={styles.automate_model}>
        <div className={styles.automate_ab}>
          <input
            className={styles.auto_input}
            type="text"
            placeholder="Friend Name"
            name="friend"
            ref={names}
          />

          <input
            className={styles.auto_input}
            ref={email}
            placeholder="Email"
            type="email"
            name="email"
          />

          <input
            ref={date}
            className={styles.auto_input}
            placeholder="dd-mm-yyyy"
            name="date"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            style={{ width: "91%" }}
          />

          <input
            ref={nam}
            className={styles.auto_input}
            placeholder="Your Name"
            type="text"
            name="name"
          />

          <div className={styles.auto_input} id={styles.auto_button}>
            <button
              onClick={() => router.push("/")}
              className={styles.cancel_btn}
            >
              Cancel
            </button>
            <button className={styles.mybutton} onClick={handleSubmit}>
              Automate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
