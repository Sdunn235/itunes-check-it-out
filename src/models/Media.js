/**
 * Base class for every iTunes result.
 *
 * The factory (MediaFactory) does Object.assign(new Song(), rawResult), which copies
 * the raw iTunes fields (trackName, artworkUrl100, ...) straight onto the object.
 * These getters then turn those messy raw fields into clean, consistent values
 * that every card component can rely on.
 *
 * Treat this as ABSTRACT: create Song, Podcast, etc. never a plain Media.
 */
export default class Media {
    // Each subclass overrides this ('Song', 'Podcast', ...).
    // Used to pick the right card component for each result.
    static type = 'Media';

    /** Instance shortcut so templates can write media.type */
    get type() {
        return this.constructor.type;
    }

    /** Unique id: tracks (songs, episodes) use trackId; albums/audiobooks only have collectionId */
    get id() {
        return this.trackId ?? this.collectionId;
    }

    get title() {
        return this.trackName ?? this.collectionName ?? 'Untitled';
    }

    get creator() {
        return this.artistName ?? 'Unknown';
    }

    /**
     * Best available artwork, upscaled.
     * iTunes URLs end in ".../100x100bb.jpg" — swapping the size gets a sharper image.
     * Returns null when there's no image so cards can v-if it away.
     */
    get image() {
        const url = this.artworkUrl600 ?? this.artworkUrl100;

        return url ? url.replace(/\d+x\d+bb/, '600x600bb') : null;
    }

    /** Formatted price, or null when free / not sold (iTunes uses -1 for that) */
    get price() {
        const amount = this.trackPrice ?? this.collectionPrice;

        if (amount == null || amount < 0) {
            return null;
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.currency ?? 'USD',
        }).format(amount);
    }

    /** Link to the item on Apple's site */
    get link() {
        return this.trackViewUrl ?? this.collectionViewUrl ?? null;
    }

    get genre() {
        return this.primaryGenreName ?? null;
    }

    get year() {
        return this.releaseDate ? new Date(this.releaseDate).getFullYear() : null;
    }

    /**
     * Shared helper for the subclasses that have a running time.
     * 215000 ms -> "3:35",  3725000 ms -> "1:02:05"
     */
    static formatDuration(ms) {
        if (!ms) {
            return null;
        }

        const totalSeconds = Math.round(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return hours > 0
            ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`
            : `${minutes}:${seconds}`;
    }
}
