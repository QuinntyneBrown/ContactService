export class Account { 
    public id:any;
    public name:string;

    public fromJSON(data: { name:string }): Account {
        let account = new Account();
        account.name = data.name;
        return account;
    }
}
