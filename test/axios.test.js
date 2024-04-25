import * as axios from "axios";
import * as fs from "node:fs";

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

    httpClient.interceptors.request.use(
        async (config) => {
            console.info(`Send request to ${config.baseURL}${config.url}`);
            return config;
        },
        async (error) => {
            console.error(`Request error : ${error.message}`);
            return Promise.reject(error);
        },
        {
            synchronous: false
        }
    );

    httpClient.interceptors.response.use(
        async (response) => {
            const fullUrl = response.config.baseURL + response.config.url;
            const body = JSON.stringify(response.data);
            console.info(`Receive response from ${fullUrl} with body ${body}`);
            return response;
        },
        async (error) => {
            console.error(`Response error : ${error.message}`);
            return Promise.reject(error);
        },
        {
            synchronous: false
        }
    )

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

    it('should support POST with JSON request body', async () => {
        const json = {
            username: "khannedy",
            password: "rahasia"
        }
        const response = await httpClient.post('/', json, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.data.success).toBe(true);
    });

    it('should support POST with TEXT request body', async () => {
        const text = "Eko Kurniawan Khannedy";
        const response = await httpClient.post('/', text, {
            headers: {
                "Content-Type": "text/plain",
                "Accept": "application/json"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.data.success).toBe(true);
    });

    it('should support POST with FORM request body', async () => {
        const json = {
            username: "khannedy",
            password: "rahasia"
        }
        const response = await httpClient.post('/', json, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.data.success).toBe(true);
    });

    it('should support POST with MULTIPART request body', async () => {
        const data = fs.readFileSync("image.png");

        const form = new FormData();
        form.append("username", "khannedy");
        form.append("password", "rahasia");
        form.append("file", new Blob(data), "image.png")

        const response = await httpClient.post('/', form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(response.data);
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.data.success).toBe(true);
    });
});
