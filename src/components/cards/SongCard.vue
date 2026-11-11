<script>
import MediaCard from '@/components/cards/MediaCard.vue';

export default {
    name: 'SongCard',
    components: { MediaCard },
    props: {
        media: { type: Object, required: true },
    },
};
</script>

<template>
    <MediaCard :media="media">
        <ul class="list-unstyled small mb-2">
            <li v-if="media.album"><strong>Album:</strong> {{ media.album }}</li>
            <li v-if="media.trackLabel">{{ media.trackLabel }}</li>
            <li v-if="media.duration"><strong>Length:</strong> {{ media.duration }}</li>
            <li v-if="media.genre">{{ media.genre }}<span v-if="media.year"> · {{ media.year }}</span></li>
        </ul>

        <span v-if="media.isExplicit" class="badge text-bg-danger align-self-start mb-2">Explicit</span>

        <audio
            v-if="media.audioPreview"
            :src="media.audioPreview"
            controls
            preload="none"
            class="w-100 mt-auto"
        ></audio>

        <!-- Pass the parent's buttons through to MediaCard's footer -->
        <template #actions>
            <slot name="actions"></slot>
        </template>
    </MediaCard>
</template>
