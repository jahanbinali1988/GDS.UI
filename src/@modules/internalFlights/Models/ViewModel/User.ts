export class User {
    Id: number;
    Username: string;
    Password: string;
    Salt: string;
    UserTypeId: number;
    IsLocked: boolean;
    LockoutEndDateUtc: Date;
    IsDisabled: boolean;
    IsDeleted: boolean;

    HashedPassword: string;
    LockoutEndDateUtcCaption: string;
    UserTypeCaption: string;
}
