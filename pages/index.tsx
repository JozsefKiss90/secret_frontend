import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Navbar from '../UI/Navbar'; 

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Secret Server</h1>
      <Link href={{ pathname: "/secret_form" }}>
        <h3>
          Create Secret
        </h3>
      </Link>
      <Link href={{ pathname: "/secret_retrieve" }}>
        <h3>
          Retrieve Secret
        </h3>
      </Link>
    </div>
  );
}
