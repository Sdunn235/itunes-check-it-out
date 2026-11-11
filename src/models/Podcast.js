import Media from '@/models/Media.js';

export default class Podcast extends Media {
    static type = 'Podcast';

    get host() {
        return this.artistName ?? 'Unknown host';
    }

    /** iTunes reuses trackCount to mean "number of episodes" for podcasts */
    get episodeCount() {
        return this.trackCount ?? 0;
    }

    /** ['News', 'Podcasts', 'True Crime'] -> "News, True Crime" */
    get genreList() {
        return (this.genres ?? []).filter((g) => g !== 'Podcasts').join(', ');
    }

    /** For podcasts, releaseDate is the date of the newest episode */
    get latestEpisode() {
        return this.releaseDate ? new Date(this.releaseDate).toLocaleDateString() : null;
    }

    get feed() {
        return this.feedUrl ?? null;
    }

    get rating() {
        return this.contentAdvisoryRating ?? null;
    }
}
