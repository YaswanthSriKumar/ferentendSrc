import axios from "axios";

const BUrl= "http://localhost:8088";
const ApiService = {
    get: async (url,headers) => {
        console.log(BUrl+url);
        try {
            
            const response = await axios.get(BUrl+url,headers);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Unable to fetch: " + error);
        }
    },

    post: async (url, data,headers) => {
        console.log(headers);
        console.log(url);
        if (typeof headers === "undefined") {
            console.log("myVariable is undefined");
        headers=  {headers: {
            "Content-Type": "application/json", // Important for file uploads
            },}
        }
        console.log(headers);
        try {
            const response = await axios.post(BUrl+url, data,headers);
            console.log(response.data);
            return response;
        } catch (error) {
            console.log("Unable to post: " + error);
        }
    },

    put: async (url, data) => {
        try {
            const response = await axios.put(BUrl+url, data);
            console.log("inside api call : "+BUrl+url);
            console.log("inside api call : "+data.serviceShow);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Unable to update: " + error);
        }
    },

    delete: async (url) => {
        try {
            const response = await axios.delete(BUrl+url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Unable to delete: " + error);
        }
    }
};

export default ApiService;
