import Media from '@/models/Media.js';

export default class Audiobook extends Media {
    static type = 'Audiobook';

    get author() {
        return this.artistName ?? 'Unknown author';
    }

    /**
     * iTunes sends the description WITH HTML tags (<b>, <i>, <br>).
     * Strip them so we can display it as plain, safe text.
     * NOTE: named "summary", NOT "description" — iTunes already sends a raw
     * "description" field, and a getter with that name would make Object.assign throw.
     */
    get summary() {
        return this.description ? this.description.replace(/<[^>]*>/g, '').trim() : null;
    }

    get audioPreview() {
        return this.previewUrl ?? null;
    }
}
