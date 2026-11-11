<script>
import { cardFor } from '@/components/cards/index.js';
import LibraryCollection from '@/models/LibraryCollection.js';

/**
 * Grid of search results. Each result is drawn with the card for its type,
 * and gets an "Add to Bag" button through the card's actions slot.
 */
export default {
    name: 'SearchResults',
    props: {
        results: { type: Array, required: true },
        // Only READ here, to know which results are already bagged
        bag: { type: LibraryCollection, required: true },
    },
    emits: ['add'],
    methods: {
        cardFor,
    },
};
</script>

<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
        <div v-for="media in results" :key="`${media.type}-${media.id}`" class="col">
            <component :is="cardFor(media)" :media="media">
                <template #actions>
                    <button
                        v-if="bag.contains(media)"
                        type="button"
                        class="btn btn-sm btn-outline-success"
                        disabled
                    >
                        <i class="fas fa-check me-1" aria-hidden="true"></i>In bag
                    </button>
                    <button
                        v-else
                        type="button"
                        class="btn btn-sm btn-success"
                        @click="$emit('add', media)"
                    >
                        <i class="fas fa-plus me-1" aria-hidden="true"></i>Add to Bag
                    </button>
                </template>
            </component>
        </div>
    </div>
</template>
