import { createContext, useContext, useState } from 'react';
import useFetch from '../utils/client/hooks/useFetch';
import { roundUp, formatNumber } from '../utils/client';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/Home.module.css';

const processApiResponse = rawData => ({
    ...rawData,
    _home: rawData.data.map(({ cmc_rank, name, quote }) => (
        {
            name,
            rank: cmc_rank,
            price: `$${formatNumber(quote.USD.price)}`,
            price_change: `${roundUp(quote.USD.percent_change_24h)}%`,
            market_cap: `$${formatNumber(quote.USD.market_cap)}`,
            volume: `$${formatNumber(quote.USD.volume_24h)}`,
        }
    )),
    _liquidity: {
        data: [
            ['ID', 'Volume', 'Market Cap', 'Name', 'Absolute Price Change'],
            ...rawData.data.map(({ symbol, name, quote }) =>
                [
                    symbol,
                    roundUp(quote.USD.volume_24h),
                    roundUp(quote.USD.market_cap),
                    name,
                    Math.abs(roundUp(quote.USD.percent_change_24h))
                ]
            )
        ],
        options: {
            title: 'Liquidity',
            hAxis: { title: 'Volume' },
            vAxis: { title: 'Market Cap' },
            bubble: { textStyle: { fontSize: 11 } },
        }
    }
});

const AppContext = createContext();

export function AppWrapper({ children }) {

    const [limit, setLimit] = useState(10);
    const { response, loading } = useFetch({
        api: `/api/v1/cryptocurrency/listings/latest?limit=${limit}`,
        processor: processApiResponse
    });

    return (
        <AppContext.Provider value={{ response, loading, totalItems: limit }}>
            <div className={styles.container}>
                <div className="dd">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label sm={2} column>Limit</Form.Label>
                        <Col>
                            <Form.Select onChange={e => setLimit(e.target.value)}>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="5000">All</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </div>
            </div>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}