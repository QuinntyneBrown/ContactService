import { fetch } from "../utilities";
import { Profile } from "./profile.model";

export class ProfileService {
    constructor(private _fetch = fetch) { }

    private static _instance: ProfileService;

    public static get Instance() {
        this._instance = this._instance || new ProfileService();
        return this._instance;
    }

    public get(): Promise<Array<Profile>> {
        return this._fetch({ url: "/api/profile/get", authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { profiles: Array<Profile> }).profiles;
        });
    }

    public getById(id): Promise<Profile> {
        return this._fetch({ url: `/api/profile/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { profile: Profile }).profile;
        });
    }

    public add(profile) {
        return this._fetch({ url: `/api/profile/add`, method: "POST", data: { profile }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `/api/profile/remove?id=${options.id}`, method: "DELETE", authRequired: true  });
    }
    
}
