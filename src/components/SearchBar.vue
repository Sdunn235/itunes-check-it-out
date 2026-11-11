<script>
import { MEDIA_OPTIONS } from '@/services/ITunesApi.js';

/**
 * The search form. It only collects what the user typed and announces it
 * with a "search" event; App does the actual searching.
 */
export default {
    name: 'SearchBar',
    props: {
        // App sets this while a search is running, so we can show a spinner
        loading: { type: Boolean, default: false },
    },
    emits: ['search'],
    data() {
        return {
            term: '',
            media: 'all',
            mediaOptions: MEDIA_OPTIONS,
        };
    },
    computed: {
        canSearch() {
            return this.term.trim().length > 0 && !this.loading;
        },
    },
    methods: {
        submit() {
            if (!this.canSearch) {
                return;
            }

            this.$emit('search', { term: this.term.trim(), media: this.media });
        },
    },
};
</script>

<template>
    <form class="row g-2 align-items-center" role="search" @submit.prevent="submit">
        <div class="col-12 col-md">
            <label for="search-term" class="visually-hidden">Search iTunes</label>
            <input
                id="search-term"
                v-model="term"
                type="search"
                class="form-control form-control-lg"
                placeholder="Search songs, shows, audiobooks, podcasts..."
                autocomplete="off"
            >
        </div>

        <div class="col-8 col-md-3 col-lg-2">
            <label for="search-media" class="visually-hidden">Media type</label>
            <select id="search-media" v-model="media" class="form-select form-select-lg">
                <option v-for="option in mediaOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div class="col-4 col-md-auto">
            <button type="submit" class="btn btn-primary btn-lg w-100" :disabled="!canSearch">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
                <i v-else class="fas fa-search me-1" aria-hidden="true"></i>
                Search
            </button>
        </div>
    </form>
</template>
