export interface IndexUser {
    id: number;
    name: string;
    kana: string;
    email: string;
    office: string;
}

export interface IndexUserProps {
    id: number;
    office_id: number | null;
    name: string;
    kana: string;
    email: string;
    role: number | null;
    office: {
        id: number;
        name: string;
    } | null;
}
