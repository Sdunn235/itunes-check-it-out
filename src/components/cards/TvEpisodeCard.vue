<script>
import MediaCard from '@/components/cards/MediaCard.vue';

export default {
    name: 'TvEpisodeCard',
    components: { MediaCard },
    props: {
        media: { type: Object, required: true },
    },
};
</script>

<template>
    <MediaCard :media="media">
        <ul class="list-unstyled small mb-2">
            <li v-if="media.series"><strong>Season:</strong> {{ media.series }}</li>
            <li v-if="media.duration"><strong>Length:</strong> {{ media.duration }}</li>
            <li v-if="media.genre">{{ media.genre }}<span v-if="media.year"> · {{ media.year }}</span></li>
        </ul>

        <span v-if="media.rating" class="badge text-bg-secondary align-self-start mb-2">{{ media.rating }}</span>

        <!-- Plain text with {{ }} (never v-html), clamped to 3 lines -->
        <p v-if="media.summary" class="small text-body-secondary line-clamp-3 mb-0">{{ media.summary }}</p>

        <template #actions>
            <slot name="actions"></slot>
        </template>
    </MediaCard>
</template>
