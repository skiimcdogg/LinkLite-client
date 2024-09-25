import axios from 'axios';

const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

function errorHandler(error) {
    if(error.response.data) {
        console.error(error.response.data);
        throw error;
    }
    throw error;
}

const apiHandler = {
    service,

    async shortenUrl(originalUrl) {
        try {
            const response = await service.post("/shorten-url", originalUrl);
            return response.data
        } catch(err) {
            errorHandler(err)
        }
    },

    async getUrlsList() {
        try {
            const response = await service.get("/list-user-urls");
            return response.data
        } catch(err) {
            errorHandler(err)
        }
    },

    async redirectNewUrl(shortenUrl) {
        try {
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

    async deleteUrl(shortenUrl) {
        try {
            const response = await service.delete(`/delete-url/${shortenUrl}/`);
            console.log(response.data.detail);
        } catch(err) {
            errorHandler(err)
        }
    },

}

export default apiHandler;