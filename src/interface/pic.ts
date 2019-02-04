import { DateTime } from 'ionic-angular';

export interface Pic {
    file_id: number;
    filename: string;
    filesize: string;
    title: string;
    description: string;
    user_id: number;
    media_type: string;
    mime_type: string;
    time_added: DateTime;
    screenshot?: string;
    thumbnails?: Thumbnails;
    }
export interface Thumbnails {
  w160: string;
  w320?: string;
  w640?: string;
}
