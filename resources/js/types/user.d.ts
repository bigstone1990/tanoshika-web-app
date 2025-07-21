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

export interface ShowUser {
    id: number;
    name: string;
    kana: string;
    email: string;
    role: string;
    office: string;
    can_manage_jobs: boolean;
    can_manage_rules: boolean;
    can_manage_groupings: boolean;
    created_at: string;
    creator: string | null;
    updated_at: string;
    updater: string | null;
}
