import React from 'react';
import Head from 'next/head';

const MetaHead = ({ title, description }) => {
    return (
        <Head>
            <title>{title || 'Wattx'}</title>
            <meta name="description" content={description || 'Wattx Coding Challenge'} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default MetaHead;