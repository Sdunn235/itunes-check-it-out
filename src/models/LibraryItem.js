/**
 * Wraps ANY media object (Song, Podcast, TvEpisode...) and gives it
 * checkout behavior. It never looks inside the media, which is why
 * checkout keeps working no matter what iTunes sends back.
 */
export default class LibraryItem {
    // Shared by every LibraryItem; frozen so nothing can change the values at runtime
    static STATUSES = Object.freeze({
        IN: 'in',
        OUT: 'out',
        ONHOLD: 'onhold',
    });

    media;
    status;

    constructor(media) {
        this.media = media;

        // every new item starts on the shelf
        this.checkIn();
    }

    checkIn() {
        this.status = LibraryItem.STATUSES.IN;
    }

    checkOut() {
        this.status = LibraryItem.STATUSES.OUT;
    }

    placeHold() {
        this.status = LibraryItem.STATUSES.ONHOLD;
    }

    isAvailable() {
        return this.status === LibraryItem.STATUSES.IN;
    }
}

