export async function parseResponse(response) {
    const headers = await response.headers();
    const contentType = headers['content-type'] || '';
    if (contentType.includes('application/json')) {
        return await response.json();
    } else {
        // XML, plain text, HTML
        return await response.text();
    }
}