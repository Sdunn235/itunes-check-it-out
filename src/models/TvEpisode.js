import Media from '@/models/Media.js';

export default class TvEpisode extends Media {
    static type = 'TvEpisode';

    /** iTunes puts the SHOW name in artistName */
    get show() {
        return this.artistName ?? 'Unknown show';
    }

    /** e.g. "The Office: The Complete Series" */
    get series() {
        return this.collectionName ?? null;
    }

    get duration() {
        return Media.formatDuration(this.trackTimeMillis);
    }

    get summary() {
        return this.longDescription ?? this.shortDescription ?? null;
    }

    /** e.g. "TV-14" */
    get rating() {
        return this.contentAdvisoryRating ?? null;
    }
}
