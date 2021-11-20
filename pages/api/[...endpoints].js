import serverConfig from '../../config/server';
import { createQueryString } from '../../utils/server';

const { API_BASE_URL, API_KEY } = serverConfig;

const handler = async (req, res) => {
    const { method, query } = req;

    if (method === 'POST') {

        const { endpoints, ...queryParams } = query;
        const url = `${API_BASE_URL}${endpoints.join('/')}${createQueryString(queryParams)}`;

        const rawResponse = await fetch(url, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY
            }
        });
        const response = await rawResponse.json();

        return res.status(200).json(response);
    }

    return res.status(405).end(`Method Not Allowed`);
}

export default handler;