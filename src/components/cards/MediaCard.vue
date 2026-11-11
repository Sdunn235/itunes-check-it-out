<script>
/**
 * The frame every card shares: image, type badge, title, creator, link, price.
 * Type-specific cards (SongCard, PodcastCard, ...) wrap this and fill the
 * default slot with their own details. Also used on its own as the fallback
 * card for any type that has no card of its own.
 */
export default {
    name: 'MediaCard',
    props: {
        media: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="card h-100 shadow-sm">
        <img
            v-if="media.image"
            :src="media.image"
            :alt="media.title"
            class="card-img-top media-art"
            loading="lazy"
        >
        <div
            v-else
            class="card-img-top media-art bg-secondary-subtle text-secondary d-flex align-items-center justify-content-center"
        >
            <i class="fas fa-image fa-2x" aria-hidden="true"></i>
            <span class="visually-hidden">No image</span>
        </div>

        <div class="card-body d-flex flex-column">
            <span class="badge text-bg-dark align-self-start mb-2">{{ media.type }}</span>
            <h5 class="card-title mb-1">{{ media.title }}</h5>
            <p class="card-subtitle text-body-secondary mb-2">{{ media.creator }}</p>

            <!-- Type-specific details come from the specific card (SongCard, ...) -->
            <slot></slot>

            <a
                v-if="media.link"
                :href="media.link"
                target="_blank"
                rel="noopener"
                class="small mt-2"
            >
                View on Apple <i class="fas fa-external-link-alt" aria-hidden="true"></i>
            </a>
        </div>

        <div class="card-footer d-flex justify-content-between align-items-center gap-2">
            <span class="fw-semibold">{{ media.price ?? 'Not for sale' }}</span>

            <!-- Buttons come from whoever shows the card (search results or the bag) -->
            <slot name="actions"></slot>
        </div>
    </div>
</template>
