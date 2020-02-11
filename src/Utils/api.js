import axios from "axios";
import Cookies from 'js-cookie'

const headers = {
    "Content-Type": "application/json"
};

// const burl = "http://localhost:5000";
const url = "https://sleepy-atoll-40332.herokuapp.com";
//const url = process.env.URL;

export default {
    getRoutineList: async function () {
        // return axios.get(
        //     `${url}/api/getRoutineList`,
        // )
        return [
            {
                name: "My Routine",
                actionService: "intra",
                isActive: false
            }, {
                name: "My Routine 2",
                actionService: "twitter",
                isActive: true
            },
        ];
    },
    getServices: async function () {
        // return axios.get(
        //     `${url}/api/getServices`,
        // )
        return [
            {name: "Twitter", value: "twitter"},
            {name: "Intra Epitech", value: "intra"},
        ];
    },
    login: function (email, password) {
        return axios.post(
            `${url}/api/auth/login`,
            {
                email,
                password
            },
            {
                headers: headers
            }
        ).catch((error) => {
            return (error.response)
        })
    },
    signup: function (email, password) {
        return axios.post(
            `${url}/api/auth/register`,
            {
                email,
                password
            },
            {headers: headers}
        ).catch((error) => {
            return (error.response)
        });
    },
    isAuth: function () {
        return Cookies.get('jwt') !== undefined;
    },
    logout: function () {
        Cookies.remove('jwt')
    }
};