"use client"
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    if (navigator.language.includes("en")) {
      location.href = "/en"
    } else {
      location.href = "/fr"
    }
  });
  return (
    <></>
  );

}
