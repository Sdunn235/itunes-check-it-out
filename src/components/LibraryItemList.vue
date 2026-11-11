<script>
import LibraryItemCard from '@/components/LibraryItemCard.vue';
import LibraryCollection from '@/models/LibraryCollection.js';
import LibraryItem from '@/models/LibraryItem.js';

/** The "My Bag" tab: a summary line plus one LibraryItemCard per bagged item. */
export default {
    name: 'LibraryItemList',
    components: { LibraryItemCard },
    props: {
        bag: { type: LibraryCollection, required: true },
    },
    emits: ['remove'],
    computed: {
        /** { in: 2, out: 1, onhold: 0 } for the summary line */
        statusCounts() {
            const counts = Object.fromEntries(
                Object.values(LibraryItem.STATUSES).map((status) => [status, 0]),
            );

            this.bag.items.forEach((item) => {
                counts[item.status] += 1;
            });

            return counts;
        },
    },
};
</script>

<template>
    <div v-if="bag.count === 0" class="alert alert-secondary">
        <i class="fas fa-shopping-bag me-1" aria-hidden="true"></i>
        Your bag is empty. Search for something and click <strong>Add to Bag</strong>.
    </div>

    <template v-else>
        <p class="text-body-secondary">
            {{ bag.count }} in bag:
            {{ statusCounts.in }} available,
            {{ statusCounts.out }} checked out,
            {{ statusCounts.onhold }} on hold
        </p>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
            <div v-for="item in bag.items" :key="`${item.media.type}-${item.media.id}`" class="col">
                <LibraryItemCard :item="item" @remove="$emit('remove', $event)" />
            </div>
        </div>
    </template>
</template>
