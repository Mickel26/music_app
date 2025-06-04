export const DEEZER_CONFIG = {
    BASE_URL: 'https://api.deezer.com',
    headers: {
        'accept': 'application/json',    
    }
}

export const fetchMusic = async ({ query }: { query: string }) => {
    const endpoint = query 
    ? `${DEEZER_CONFIG.BASE_URL}/search/album?q=${encodeURIComponent(query)}` 
    : `${DEEZER_CONFIG.BASE_URL}/chart/0/albums`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: DEEZER_CONFIG.headers,
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch music: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
}