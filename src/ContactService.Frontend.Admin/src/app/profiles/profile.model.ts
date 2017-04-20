export class Profile { 
    public id:any;
    public name:string;

    public fromJSON(data: { name:string }): Profile {
        let profile = new Profile();
        profile.name = data.name;
        return profile;
    }
}
