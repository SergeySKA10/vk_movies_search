export async function fetchApiKey() {
    try {
        const response = await fetch('/api/apiKey');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result.data[0]?.value;
    } catch (error) {
        console.error('Error fetching API key:', error);
        return null;
    }
}
