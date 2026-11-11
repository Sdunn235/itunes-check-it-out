<script>
import MediaCard from '@/components/cards/MediaCard.vue';

export default {
    name: 'AudiobookCard',
    components: { MediaCard },
    props: {
        media: { type: Object, required: true },
    },
};
</script>

<template>
    <MediaCard :media="media">
        <ul class="list-unstyled small mb-2">
            <li v-if="media.genre">{{ media.genre }}<span v-if="media.year"> · {{ media.year }}</span></li>
        </ul>

        <!-- summary already has iTunes' HTML tags stripped by the model -->
        <p v-if="media.summary" class="small text-body-secondary line-clamp-3 mb-2">{{ media.summary }}</p>

        <audio
            v-if="media.audioPreview"
            :src="media.audioPreview"
            controls
            preload="none"
            class="w-100 mt-auto"
        ></audio>

        <template #actions>
            <slot name="actions"></slot>
        </template>
    </MediaCard>
</template>
