import * as axios from "axios";

describe('HTTP Client', () => {
    it('should be supported by axios', async () => {
        const httpClient = axios.create({
            timeout: 5000,
            baseURL: "https://www.programmerzamannow.com/"
        });
        expect(httpClient).toBeDefined();
    });
});

describe('HTTP Method', () => {
    const httpClient = axios.create({
        baseURL: "https://enbcvv013n034.x.pipedream.net",
        timeout: 5000
    });

    it('should support GET method', async () => {
        const response = await httpClient.get('/');
        expect(response.status).toBe(200);
    });

    it('should support GET method with config', async () => {
        const response = await httpClient.get('/', {
            params: {
                name: "Eko"
            },
            headers: {
                "Accept": "application/json"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.data.success).toBe(true);
    });
});
