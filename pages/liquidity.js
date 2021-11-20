import React from 'react';
import styles from '../styles/Home.module.css';
import { MetaHead, Loader } from '../components';
import { Chart } from "react-google-charts";
import { useAppContext } from '../context/AppWrapper';

export default function liquidity() {

    const { response, loading } = useAppContext();

    return (
        <div className={styles.container}>
            <MetaHead
                title="Liquidity"
                description="Liquidity analysis page"
            />
            <main>
                {loading ?
                    <Loader /> :
                    <div>
                        <Chart
                            height={'540px'}
                            chartType="BubbleChart"
                            loader={<Loader />}
                            data={response?._liquidity?.data || []}
                            options={response?._liquidity?.options}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>}
            </main>
        </div>
    );
}