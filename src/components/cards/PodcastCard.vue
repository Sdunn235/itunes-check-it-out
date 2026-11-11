<script>
import MediaCard from '@/components/cards/MediaCard.vue';

export default {
    name: 'PodcastCard',
    components: { MediaCard },
    props: {
        media: { type: Object, required: true },
    },
};
</script>

<template>
    <MediaCard :media="media">
        <ul class="list-unstyled small mb-2">
            <li v-if="media.episodeCount"><strong>Episodes:</strong> {{ media.episodeCount }}</li>
            <li v-if="media.latestEpisode"><strong>Latest:</strong> {{ media.latestEpisode }}</li>
            <li v-if="media.genreList">{{ media.genreList }}</li>
        </ul>

        <span v-if="media.rating" class="badge text-bg-secondary align-self-start mb-2">{{ media.rating }}</span>

        <a
            v-if="media.feed"
            :href="media.feed"
            target="_blank"
            rel="noopener"
            class="small mt-auto"
        >
            <i class="fas fa-rss" aria-hidden="true"></i> RSS feed
        </a>

        <template #actions>
            <slot name="actions"></slot>
        </template>
    </MediaCard>
</template>
