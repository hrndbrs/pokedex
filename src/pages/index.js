import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      this is home
      <button>
        <Link href={"/main"}>
          To Main Page
        </Link>
      </button>
    </>
  );
}
