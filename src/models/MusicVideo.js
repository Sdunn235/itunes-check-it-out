import Media from '@/models/Media.js';

export default class MusicVideo extends Media {
    static type = 'MusicVideo';

    get duration() {
        return Media.formatDuration(this.trackTimeMillis);
    }

    /** Short video clip for a <video> tag */
    get videoPreview() {
        return this.previewUrl ?? null;
    }

    get isExplicit() {
        return this.trackExplicitness === 'explicit';
    }
}
