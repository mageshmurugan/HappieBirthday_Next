"use client";
import React from "react";

export default function Hello() {
  async function handle() {
    const res = await fetch("/api/email");
    const data = await res.json();
    console.log(data);
  }

  return <button onClick={handle}>kjgh</button>;
}
