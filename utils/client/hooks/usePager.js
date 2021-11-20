import { useState, useRef, useCallback, useEffect } from 'react';

export default function usePager(totalItems, PAGE_LIMIT = 100) {
    const [page, setPage] = useState(1);
    const observer = useRef();
    const continuePagination = totalItems > PAGE_LIMIT && (page * PAGE_LIMIT) < totalItems;

    const loaderRef = useCallback(node => {
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(p => p + 1);
            }
        })
        if (node) {
            observer.current.observe(node);
        }
    }, []);

    const pagify = useCallback(arr => {
        if (!arr || arr.length <= PAGE_LIMIT)
            return arr;
        return arr.slice(0, page * PAGE_LIMIT);
    }, [PAGE_LIMIT, page]);

    useEffect(() => {
        if (page !== 1) {
            setPage(1);
        }
    }, [totalItems])

    return { continuePagination, pagify, loaderRef };
}