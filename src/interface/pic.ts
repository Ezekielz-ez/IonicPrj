export interface Pic {
    file_id: number;
    filename: string;
    filesize: string;
    title: string;
    description: string;
    user_id: number;
    media_type: string;
    mime_type: string;
    time_added: string;
    screenshot?: string;
    thumbnails?: object;
    }