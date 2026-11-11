import MediaCard from '@/components/cards/MediaCard.vue';
import SongCard from '@/components/cards/SongCard.vue';
import MusicVideoCard from '@/components/cards/MusicVideoCard.vue';
import TvEpisodeCard from '@/components/cards/TvEpisodeCard.vue';
import AudiobookCard from '@/components/cards/AudiobookCard.vue';
import PodcastCard from '@/components/cards/PodcastCard.vue';
import AlbumCard from '@/components/cards/AlbumCard.vue';

import Song from '@/models/Song.js';
import MusicVideo from '@/models/MusicVideo.js';
import TvEpisode from '@/models/TvEpisode.js';
import Audiobook from '@/models/Audiobook.js';
import Podcast from '@/models/Podcast.js';
import Album from '@/models/Album.js';

/**
 * Model type -> card component. The card-side partner of MediaFactory.
 * Keyed by the model's static "type", NOT constructor.name:
 * "npm run build" minifies class names, so constructor.name would turn into "e" or "t".
 */
const CARDS_BY_TYPE = {
    [Song.type]: SongCard,
    [MusicVideo.type]: MusicVideoCard,
    [TvEpisode.type]: TvEpisodeCard,
    [Audiobook.type]: AudiobookCard,
    [Podcast.type]: PodcastCard,
    [Album.type]: AlbumCard,
};

/** The right card for a model, or the plain MediaCard if a type has no card yet */
export function cardFor(media) {
    return CARDS_BY_TYPE[media.type] ?? MediaCard;
}
