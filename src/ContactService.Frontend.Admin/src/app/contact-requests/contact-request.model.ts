export class ContactRequest { 

    public id:any;
    
    public name:string;

    public email: string;

    public description: string;

    public static fromJSON(data: any): ContactRequest {

        let contactRequest = new ContactRequest();

        contactRequest.name = data.name;

        contactRequest.email = data.email;

        contactRequest.description = data.description;

        return contactRequest;
    }
}
