<script>
import MediaCard from '@/components/cards/MediaCard.vue';

export default {
    name: 'AlbumCard',
    components: { MediaCard },
    props: {
        media: { type: Object, required: true },
    },
};
</script>

<template>
    <MediaCard :media="media">
        <ul class="list-unstyled small mb-2">
            <li v-if="media.songCount"><strong>Songs:</strong> {{ media.songCount }}</li>
            <li v-if="media.genre">{{ media.genre }}<span v-if="media.year"> · {{ media.year }}</span></li>
        </ul>

        <span v-if="media.isExplicit" class="badge text-bg-danger align-self-start mb-2">Explicit</span>

        <template #actions>
            <slot name="actions"></slot>
        </template>
    </MediaCard>
</template>
