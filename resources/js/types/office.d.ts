export interface IndexOffice {
    id: number;
    name: string;
    kana: string;
}

export interface ShowOffice {
    id: number;
    name: string;
    kana: string;
    created_at: string;
    creator: string | null;
    updated_at: string;
    updater: string | null;
}

export interface EditOffice {
    id: number;
    name: string;
    kana: string;
    updated_at: string;
}
