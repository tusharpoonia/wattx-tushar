export const createQueryString = (queryParams) => {
    const queries = [];
    for (const [key, value] of Object.entries(queryParams)) {
        queries.push(`${key}=${value}`);
    }
    if (queries.length === 0) {
        return '';
    }

    return `?${queries.join('&')}`;
}