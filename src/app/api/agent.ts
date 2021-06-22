import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Account } from '../models/account';
import { Transaction } from '../models/transactions';
import { User } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

const mockAxios=axios;
axios.defaults.baseURL = 'http://localhost:5000/api';
mockAxios.defaults.baseURL= 'http://localhost:3000/api';

// mockAxios.interceptors.request.use(config => {
//     const token=store.commonStore.token;
//     if(token) config.headers.Authorization = `Bearer ${token}`
//     return config;
// })

mockAxios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const mockRequests = {
    get: <T>(url: string) => mockAxios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => mockAxios.post<T>(url, body).then(responseBody),
   }
const Accounts = {
    list: () => mockRequests.get<Account[]>('/accounts/'),
    details: (id: string) => mockRequests.get<Account>(`/accounts/${id}`),
    create: (account: Account) => mockAxios.post<void>('/accounts/', account),
  }
const profile = {
    current: () => mockRequests.get<User>('/profile/'),
    login: (user: User)=> mockRequests.post<User>('/profile/login', user),
    register: (user: User)=> mockRequests.post<User>('/profile/register', user)
}
const Transactions = {
    listByAccount: (accountId : string)=> mockRequests.post<Transaction[]>('/transactions/',accountId)
}

const agent = {
    Accounts,
    profile,
    Transactions
}

export default agent;