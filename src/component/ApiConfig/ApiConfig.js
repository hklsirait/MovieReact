
import axios from "axios";

export const instance = require("axios").create({
    baseURL: "https://api.themoviedb.org",
    params: {
        api_key: "02a0af71da7001b41628363583b340a7",
        request_token: "d136ea8b0e29d347dc4127c5c9dd4c87d0d6ca43",
        session_id: "fce07ba67dda8da4d1079d6765a620ec601c16e6",
        quest_session: "b08c44dae8eba8fd9291151e77d224e5"
    }
});