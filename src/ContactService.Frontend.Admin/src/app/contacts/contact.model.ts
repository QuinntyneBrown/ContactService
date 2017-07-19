export class Contact { 

    public id:any;
    
    public name: string;

    public email: string;

    public firstname: string;

    public lastname: string;

    public streetAddress: string;

    public city: string;

    public phoneNumber: string;
    
    public static fromJSON(data: any): Contact {

        let contact = new Contact();

        contact.id = data.contactId;

        contact.name = data.name;

        contact.email = data.email;

        contact.firstname = data.firstname;

        contact.lastname = data.lastname;

        contact.city = data.city;

        contact.streetAddress = data.streetAddress;

        contact.phoneNumber = data.phoneNumber;

        return contact;
    }
}
