<script>
import SearchBar from '@/components/SearchBar.vue';
import SearchResults from '@/components/SearchResults.vue';
import LibraryItemList from '@/components/LibraryItemList.vue';

import ITunesApi, { MEDIA_OPTIONS } from '@/services/ITunesApi.js';
import LibraryCollection from '@/models/LibraryCollection.js';

/**
 * The top of the app. It OWNS the state (results + bag) and passes it down
 * as props; child components send events back up (search, add, remove).
 */
export default {
    name: 'App',
    components: { SearchBar, SearchResults, LibraryItemList },
    data() {
        return {
            bag: new LibraryCollection(),
            results: [],
            activeTab: 'search',
            loading: false,
            error: null,
            lastSearch: null, // { term, media } of the search being shown
            latestRequest: 0, // used to ignore answers from older, slower searches
        };
    },
    computed: {
        /** "Music Videos" instead of "musicVideo" for the results line */
        lastSearchLabel() {
            const option = MEDIA_OPTIONS.find((o) => o.value === this.lastSearch?.media);

            return option ? option.label : '';
        },
    },
    methods: {
        async search({ term, media }) {
            // Number this request. If the user searches again before it answers,
            // the older answer is thrown away instead of replacing newer results.
            const requestId = ++this.latestRequest;

            this.activeTab = 'search';
            this.loading = true;
            this.error = null;

            try {
                const results = await ITunesApi.search(term, media);

                if (requestId === this.latestRequest) {
                    this.results = results;
                    this.lastSearch = { term, media };
                }
            } catch (err) {
                if (requestId === this.latestRequest) {
                    console.error('iTunes search failed', err);
                    this.results = [];
                    this.error = 'Could not reach iTunes. Check your connection and try again.';
                }
            } finally {
                if (requestId === this.latestRequest) {
                    this.loading = false;
                }
            }
        },

        addToBag(media) {
            this.bag.add(media);
        },

        removeFromBag(item) {
            this.bag.remove(item);
        },
    },
};
</script>

<template>
    <nav class="navbar bg-dark">
        <span class="navbar-brand text-light">
            <i class="fas fa-shopping-bag ms-4 me-3" aria-hidden="true"></i> CHECK IT OUT!
        </span>
    </nav>

    <main class="container-xxl py-3">
        <SearchBar class="mb-3" :loading="loading" @search="search" />

        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <button
                    type="button"
                    class="nav-link"
                    :class="{ active: activeTab === 'search' }"
                    @click="activeTab = 'search'"
                >
                    <i class="fas fa-search me-1" aria-hidden="true"></i> Search
                </button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    class="nav-link"
                    :class="{ active: activeTab === 'bag' }"
                    @click="activeTab = 'bag'"
                >
                    <i class="fas fa-shopping-bag me-1" aria-hidden="true"></i> My Bag
                    <span class="badge rounded-pill text-bg-secondary">{{ bag.count }}</span>
                </button>
            </li>
        </ul>

        <!-- v-show (not v-if) keeps each tab alive, so switching tabs doesn't lose anything -->
        <section v-show="activeTab === 'search'">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <div v-else-if="loading" class="text-center py-5">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Searching...</span>
                </div>
            </div>

            <template v-else-if="lastSearch">
                <p class="text-body-secondary">
                    {{ results.length }} results for "{{ lastSearch.term }}" in {{ lastSearchLabel }}
                </p>

                <div v-if="results.length === 0" class="alert alert-info">
                    No matches. Try another word or a different media type.
                </div>

                <SearchResults v-else :results="results" :bag="bag" @add="addToBag" />
            </template>

            <div v-else class="alert alert-secondary">
                Search iTunes above. Pick a media type to narrow it to songs, music videos,
                TV shows, audiobooks, or podcasts.
            </div>
        </section>

        <section v-show="activeTab === 'bag'">
            <LibraryItemList :bag="bag" @remove="removeFromBag" />
        </section>
    </main>
</template>
