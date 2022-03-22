import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

export default class User {
    username: string = '';
    password: string = '';
    firstName: string | null = null;
    lastName: string | null = null;
    email: string = '';
    profilePhoto: string | null = null;
    headerImage: string | null = null;
    accountType: AccountType = AccountType.Personal;
    maritalStatus: MaritalStatus = MaritalStatus.Single;
    biography: string | null = null;
    dateOfBirth: Date | null = null;
    joined: Date = new Date();
    location: Location | null = null;
}
