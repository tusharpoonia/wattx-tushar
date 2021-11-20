import styles from '../styles/Home.module.css';
import { MetaHead, Loader } from '../components';
import { getAppContext } from '../context/AppWrapper';
import Table from 'react-bootstrap/Table';
import Placeholder from 'react-bootstrap/Placeholder';
import usePager from '../utils/client/hooks/usePager';

const PAGE_LIMIT = 50;

export default function Home() {
  const { response, loading, totalItems } = getAppContext();
  const { continuePagination, pagify, loaderRef } = usePager(totalItems, PAGE_LIMIT);

  return (
    <div className={styles.container}>
      <MetaHead
        title="Home"
        description="Market overview"
      />

      <main>
        {loading ?
          <Loader /> :
          <div>
            <Table variant="dark" hover striped bordered responsive>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Price Change (24h)</th>
                  <th>Market Cap</th>
                  <th>Volume (24h)</th>
                </tr>
              </thead>

              <tbody>
                {(pagify(response?._home))?.map(({ rank, name, price, price_change, market_cap, volume }, key) => (
                  <tr key={key}>
                    <td>{rank}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{price_change}</td>
                    <td>{market_cap}</td>
                    <td>{volume}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {continuePagination &&
              <div ref={loaderRef}>
                <Placeholder as="p" animation="wave">
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                </Placeholder>
              </div>}
          </div>}
      </main>
    </div>
  )
}
