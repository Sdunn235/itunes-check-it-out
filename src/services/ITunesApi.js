import axios from 'axios';
import MediaFactory from '@/factories/MediaFactory.js';

/**
 * Choices for the search dropdown.
 * "value" is what iTunes expects in its "media" parameter.
 */
export const MEDIA_OPTIONS = [
    { value: 'all', label: 'Everything' },
    { value: 'music', label: 'Songs & Albums' },
    { value: 'musicVideo', label: 'Music Videos' },
    { value: 'tvShow', label: 'TV Shows' },
    { value: 'audiobook', label: 'Audiobooks' },
    { value: 'podcast', label: 'Podcasts' },
];

// One preconfigured axios instance, so the base URL and timeout live in one place
const client = axios.create({
    baseURL: 'https://itunes.apple.com',
    timeout: 10000,
});

export default class ITunesApi {
    static RESULT_LIMIT = 24;

    /**
     * Search iTunes and return ready-to-use models (Song, Podcast, ...).
     * Errors are NOT caught here; the component that calls this shows them to the user.
     */
    static async search(term, media = 'all') {
        const cleanTerm = term.trim();

        if (!cleanTerm) {
            return [];
        }

        const response = await client.get('/search', {
            params: {
                term: cleanTerm,
                media,
                limit: ITunesApi.RESULT_LIMIT,
            },
        });

        return MediaFactory.createAllFromITunes(response.data.results);
    }
}
