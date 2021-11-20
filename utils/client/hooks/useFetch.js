import { useEffect, useState } from "react";


const useFetch = ({ api, processor = res => res }) => {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        let cancelRequest = false;

        const fetchResponse = async (url) => {
            setLoading(true);
            const rawResponse = await fetch(url, { method: 'POST' });
            const jsonResponse = await rawResponse.json();
            setLoading(false);
            if (cancelRequest) {
                return;
            }

            setResponse(processor(jsonResponse));
        }

        fetchResponse(api);

        return () => cancelRequest = true;
    }, [api])

    return { loading, response };
}

export default useFetch;