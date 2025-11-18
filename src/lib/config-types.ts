export interface Company {
    id: string;
    name: string;
    logoUrl?: string;
}

export interface City {
    id: string;
    name: string;
    country: string;
}

export interface Branch {
    id: string;
    name: string;
    cityId: string;
    address: string;
}

export interface Currency {
    id: string;
    name: string;
    symbol: string;
    code: string; // ISO 4217 code
}

export interface Language {
    id: string;
    name: string;
    code: string; // ISO 639-1 code
}
