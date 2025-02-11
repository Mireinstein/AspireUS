// pages/index.js
import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>AspireUS - Home</title>
        <meta name="description" content="Welcome to AspireUS, an AI-powered college application platform." />
      </Head>
      <main>
        <h1>Welcome to AspireUS</h1>
        <p>You have logged in</p>
      </main>
    </div>
  );
}
