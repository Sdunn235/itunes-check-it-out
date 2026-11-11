import Song from '@/models/Song.js';
import MusicVideo from '@/models/MusicVideo.js';
import TvEpisode from '@/models/TvEpisode.js';
import Audiobook from '@/models/Audiobook.js';
import Podcast from '@/models/Podcast.js';
import Album from '@/models/Album.js';

/**
 * iTunes "kind" value -> the model class that handles it.
 * Adding a new media type = one import + one line here.
 */
const MODELS_BY_KIND = {
    'song': Song,
    'music-video': MusicVideo,
    'tv-episode': TvEpisode,
    'podcast': Podcast,
};

export default class MediaFactory {
    /**
     * Decide which model class fits one raw iTunes result.
     * Returns null when we don't support that kind of result.
     */
    static pickModel(raw) {
        // Audiobooks have NO "kind" field, only wrapperType
        if (raw.wrapperType === 'audiobook') {
            return Audiobook;
        }

        // Albums come back as a "collection"
        if (raw.wrapperType === 'collection' && raw.collectionType === 'Album') {
            return Album;
        }

        return MODELS_BY_KIND[raw.kind] ?? null;
    }

    /** Build ONE model from ONE raw iTunes result (or null if unsupported) */
    static createFromITunes(raw) {
        const Model = MediaFactory.pickModel(raw);

        if (!Model) {
            console.warn('MediaFactory: skipping unsupported result', raw.kind ?? raw.wrapperType);
            return null;
        }

        return Object.assign(new Model(), raw);
    }

    /** Build models from the whole "results" array, dropping anything unsupported */
    static createAllFromITunes(results = []) {
        return results
            .map((raw) => MediaFactory.createFromITunes(raw))
            .filter((media) => media !== null);
    }
}
