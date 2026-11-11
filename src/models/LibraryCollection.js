import LibraryItem from '@/models/LibraryItem.js';

/**
 * The "bag". Uses COMPOSITION: it HAS an array instead of BEING an array.
 * Outside code can only use the methods below, so it can't mess up the list.
 */
export default class LibraryCollection {
    // internal array; underscore = "please don't touch from outside"
    _arr;

    constructor(arr) {
        this._arr = Array.isArray(arr) ? arr : [];
    }

    /**
     * Wraps a media object in a LibraryItem and adds it.
     * Skips duplicates so the same song can't be bagged twice.
     * Returns `this` so calls can be chained, like the demo.
     */
    add(media) {
        if (!this.contains(media)) {
            this._arr.push(new LibraryItem(media));
        }

        return this;
    }

    /** Removes a LibraryItem (what the bag's Delete button passes in). */
    remove(libraryItem) {
        const index = this._findIndex(libraryItem.media);

        // guard: splice(-1, 1) would delete the LAST item by mistake
        if (index >= 0) {
            this._arr.splice(index, 1);
        }

        return this;
    }

    /** Is this media already in the bag? (used to disable "Add to Bag") */
    contains(media) {
        return this._findIndex(media) >= 0;
    }

    get count() {
        return this._arr.length;
    }

    /** A copy, so outside code can't push/splice the real array */
    get items() {
        return [...this._arr];
    }

    // Matches by media id (every iTunes result has one) instead of ===
    _findIndex(media) {
        return this._arr.findIndex((item) => item.media.id === media.id);
    }
}
