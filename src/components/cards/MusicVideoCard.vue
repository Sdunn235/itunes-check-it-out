<script>
import MediaCard from '@/components/cards/MediaCard.vue';

export default {
    name: 'MusicVideoCard',
    components: { MediaCard },
    props: {
        media: { type: Object, required: true },
    },
};
</script>

<template>
    <MediaCard :media="media">
        <ul class="list-unstyled small mb-2">
            <li v-if="media.duration"><strong>Length:</strong> {{ media.duration }}</li>
            <li v-if="media.genre">{{ media.genre }}<span v-if="media.year"> · {{ media.year }}</span></li>
        </ul>

        <span v-if="media.isExplicit" class="badge text-bg-danger align-self-start mb-2">Explicit</span>

        <!-- Music videos get a VIDEO preview instead of audio -->
        <video
            v-if="media.videoPreview"
            :src="media.videoPreview"
            controls
            preload="none"
            class="w-100 rounded mt-auto"
        ></video>

        <template #actions>
            <slot name="actions"></slot>
        </template>
    </MediaCard>
</template>
