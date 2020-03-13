export class Location {
    Id: number;
    Name: string;
    LatinName: string;
    ParentId: number;
    LocationTypeId: number;
    IsCapital: number;
    nickname: string;
    Iso: string;
    Iso3: string;
    Code: string;
    Priority: number;
    IsDomestic: boolean;
    Description: string;
    IsDisabled: boolean;
    IsDeleted: boolean;

    parentCaption: string;
    locationTypeCaption: string;
}
