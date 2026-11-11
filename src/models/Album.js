import Media from '@/models/Media.js';

export default class Album extends Media {
    static type = 'Album';

    get songCount() {
        return this.trackCount ?? 0;
    }

    /** Albums use collectionExplicitness (they have no "track" fields) */
    get isExplicit() {
        return this.collectionExplicitness === 'explicit';
    }
}
