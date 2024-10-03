import { initializeService, errorHandler, getAccessToken } from "./apiServices";

const apiHandler = {

    async shortenUrl(originalUrl, userId) {
        try {
            const service = await initializeService();
            const accessToken = getAccessToken();            
            const response = await service.post("/shorten-url/", { originalUrl, userId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );            
            return response.data
        } catch(err) {
            errorHandler(err)
        }
    },

    async getUrlsList() {
        try {
            const service = await initializeService();
            const response = await service.get("/list-user-urls/", { headers: {
                'Authorization': `Bearer ${getAccessToken}`}
            });
            return response.data
        } catch(err) {
            errorHandler(err)
        }
    },

    async redirectNewUrl(shortenUrl) {
        try {
            const service = await initializeService();
            const response = await service.get(`/${shortenUrl}`, { maxRedirects: 0 });
            if(response.status >= 300 && response.status < 400) {
                const redirectUrl = response.headers.location;
                window.location.href = redirectUrl;
            } else if(response.status >= 400) {
                console.error('Erreur de redirection:', response.data);
            } else {
                return response.data;
            }
        } catch(err) {
            errorHandler(err)
        }
    },

    async deleteUrl(shortUrl) {
        try {
            const service = await initializeService();
            const response = await service.delete(`/delete-url/${shortUrl}/`);
            console.log(response.data.detail);
        } catch(err) {
            errorHandler(err)
        }
    },

}

export default apiHandler;