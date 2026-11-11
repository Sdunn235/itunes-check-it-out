import Media from '@/models/Media.js';

export default class Song extends Media {
    static type = 'Song';

    get album() {
        return this.collectionName ?? null;
    }

    get duration() {
        return Media.formatDuration(this.trackTimeMillis);
    }

    /** "Track 3 of 12" */
    get trackLabel() {
        return this.trackNumber ? `Track ${this.trackNumber} of ${this.trackCount}` : null;
    }

    /** 30-second audio clip for an <audio> tag */
    get audioPreview() {
        return this.previewUrl ?? null;
    }

    get isExplicit() {
        return this.trackExplicitness === 'explicit';
    }
}
