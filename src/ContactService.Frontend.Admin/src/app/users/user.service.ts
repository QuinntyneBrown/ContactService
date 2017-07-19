import { fetch, formEncode } from "../utilities";
import { User } from "./user.model";
import { environment } from "../environment";

export class UserService {

    private static _instance;

    public static get Instance() {
        this._instance = this._instance || new UserService();
        return this._instance;
    }

    public get() {
        return fetch({url: `${environment.baseUrl}/api/user/get`, authRequired: true });
    }

    public getById(id) {
        return fetch({ url: `${environment.baseUrl}/api/user/getbyid?id=${id}`, authRequired: true });
    }

    public add(user) {
        return fetch({ url: `${environment.baseUrl}/api/user/add`, method: "POST", data: { user }, authRequired: true });
    }

    public remove(options: { id: number }) {
        return fetch({ url: `${environment.baseUrl}/api/user/remove?id=${options.id}`, method: "DELETE", authRequired: true });
    }

    public tryToLogin = (options: { username: string, password: string }) => {
        Object.assign(options, { grant_type: "password" });
        return fetch({
            url: `${environment.baseUrl}/api/user/token`,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: formEncode(options)
        }).catch((error) => {

        });
    }

    public register(options: {
        firstname: string,
        lastname: string,
        emailAddress: string,
        password: string,
        confirmPassword: string
    }) {
        return fetch({
            url: `${environment.baseUrl}/api/user/register`,
            method: "POST",
            data: options
        });
    }

    public getCurrentUser = () => fetch({
        url: `${environment.baseUrl}/api/user/current`,
        method: "GET",
        authRequired:true
    });

}