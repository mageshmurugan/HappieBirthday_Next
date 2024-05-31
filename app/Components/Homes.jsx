"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Login from "./Login";
import styles from "../page.module.css";

function Homes() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [click, setClick] = useState(false);
  useEffect(() => {
    const cookie = [Cookies.get("jwt"), Cookies.get("mob")];
    // console.log(cookie)
    cookie[1] && cookie[1].length >= 10 && setUser(cookie);
  }, []);
  //  console.log(`from home .....${user}`)

  function handleAutomate() {
    router.push("/form");
  }

  return (
    <>
      <section className={styles.header}>
        <div className={styles.header_content}>
          <h3>WELCOME TO</h3>
          <h1>Happie Birthday</h1>
          <h2>Automate Birthday Wishes</h2>

          {user && user[0].length >= 10 ? (
            <button onClick={handleAutomate} className={styles.mybutton}>
              Automate
            </button>
          ) : click ? (
            <Login setUser={setUser} />
          ) : (
            <button className={styles.mybutton} onClick={() => setClick(true)}>
              Get Start
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default Homes;
