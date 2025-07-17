export interface IndexAdmin {
    id: number;
    name: string;
    kana: string;
    email: string;
}

export interface ShowAdmin {
    id: number;
    name: string;
    kana: string;
    email: string;
    created_at: string;
    creator: string | null;
    updated_at: string;
    updater: string | null;
}
