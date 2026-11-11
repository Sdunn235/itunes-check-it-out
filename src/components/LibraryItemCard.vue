<script>
import { cardFor } from '@/components/cards/index.js';
import LibraryItem from '@/models/LibraryItem.js';

// How each checkout status looks on screen
const STATUS_DISPLAY = {
    [LibraryItem.STATUSES.IN]: { label: 'Available', badge: 'text-bg-success' },
    [LibraryItem.STATUSES.OUT]: { label: 'Checked out', badge: 'text-bg-danger' },
    [LibraryItem.STATUSES.ONHOLD]: { label: 'On hold', badge: 'text-bg-warning' },
};

/**
 * One item in the bag. It reuses the media's normal card (SongCard, PodcastCard...)
 * and puts the checkout controls in its actions slot. The checkout logic lives
 * in LibraryItem, so this works the same for every media type.
 */
export default {
    name: 'LibraryItemCard',
    props: {
        item: { type: LibraryItem, required: true },
    },
    emits: ['remove'],
    computed: {
        status() {
            return STATUS_DISPLAY[this.item.status];
        },
        isOnHold() {
            return this.item.status === LibraryItem.STATUSES.ONHOLD;
        },
    },
    methods: {
        cardFor,
    },
};
</script>

<template>
    <component :is="cardFor(item.media)" :media="item.media">
        <template #actions>
            <div class="d-flex flex-column align-items-end gap-1">
                <span class="badge" :class="status.badge">{{ status.label }}</span>

                <div class="btn-group btn-group-sm" role="group" aria-label="Checkout actions">
                    <button
                        v-if="item.isAvailable()"
                        type="button"
                        class="btn btn-outline-primary"
                        @click="item.checkOut()"
                    >
                        Check out
                    </button>
                    <button
                        v-else
                        type="button"
                        class="btn btn-outline-primary"
                        @click="item.checkIn()"
                    >
                        Check in
                    </button>

                    <button
                        type="button"
                        class="btn btn-outline-warning"
                        :disabled="isOnHold"
                        @click="item.placeHold()"
                    >
                        Hold
                    </button>

                    <button
                        type="button"
                        class="btn btn-outline-danger"
                        title="Remove from bag"
                        @click="$emit('remove', item)"
                    >
                        <i class="fas fa-trash-alt" aria-hidden="true"></i>
                        <span class="visually-hidden">Remove</span>
                    </button>
                </div>
            </div>
        </template>
    </component>
</template>
