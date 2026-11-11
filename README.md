# CHECK IT OUT! (iTunes edition)

The Check It Out / LibraryBag app, extended to search the iTunes API.
Search for songs, music videos, TV episodes, audiobooks, podcasts (and albums),
see each result on a card made for its type, and add results to your bag to
check out, check in, or put on hold.

Built with Vite, Vue 3 (Options API, single-file components), axios, and Bootstrap 5.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).
`npm run build` makes a production build in `dist/`.

## How it works

```
SearchBar --search--> App --> ITunesApi (axios) --> iTunes Search API
                       |                                  |
                       |        MediaFactory <-- raw JSON-+
                       |             |
                       |   Song / MusicVideo / TvEpisode / Audiobook / Podcast / Album
                       v
              SearchResults --cardFor()--> SongCard, PodcastCard, ... (wrap MediaCard)
                       |
                 "Add to Bag"
                       v
     LibraryCollection (the bag) --> LibraryItem (checkout status) --> LibraryItemList / LibraryItemCard
```

## Project layout

| Path | What it is |
|---|---|
| `src/models/Media.js` | Base class for every iTunes result. Getters turn raw iTunes fields into clean values (`title`, `creator`, `image`, `price`, ...). |
| `src/models/Song.js`, `MusicVideo.js`, `TvEpisode.js`, `Audiobook.js`, `Podcast.js`, `Album.js` | One model per media type, each adding the fields that type has. |
| `src/factories/MediaFactory.js` | Picks the right model class for each raw result and builds it. Unsupported results (movies, etc.) are skipped. |
| `src/services/ITunesApi.js` | The axios call to `https://itunes.apple.com/search`, plus the media-type dropdown options. |
| `src/components/SearchBar.vue` | Search field + media-type dropdown. Emits `search`. |
| `src/components/SearchResults.vue` | Results grid with "Add to Bag" buttons. |
| `src/components/cards/` | `MediaCard` (shared frame) + one card per type, and `index.js` mapping model type to card. |
| `src/models/LibraryItem.js`, `LibraryCollection.js` | Checkout logic, unchanged by media type. |
| `src/components/LibraryItemList.vue`, `LibraryItemCard.vue` | The "My Bag" tab with check out / check in / hold / remove. |
| `src/App.vue` | Owns the state (results, bag) and wires the components together. |

## Requirements checklist

| Requirement | Where |
|---|---|
| Search field, in a separate component | `SearchBar.vue` |
| On submit, search the iTunes API with axios | `ITunesApi.search()` called from `App.search()` |
| A media type for each kind of result, each with its own fields | `Song`, `MusicVideo`, `TvEpisode`, `Audiobook`, `Podcast` (+ `Album`) extend `Media` |
| Display results with the matching component | `cards/index.js` `cardFor()` + `<component :is>` in `SearchResults.vue` |
| Show the image when one is available | `Media.image` (upscaled to 600x600, `null` if missing) + `v-if` in `MediaCard.vue` |
| A factory to keep it tidy | `MediaFactory.createAllFromITunes()` |
| Checkout still works, independent of media | `LibraryItem` / `LibraryCollection` never look inside the media |
| No `node_modules` in the submission | `.gitignore` |

## Notes

- Choose a media type in the dropdown to see each card type. "Everything" (`media=all`)
  mostly returns songs or TV episodes.
- iTunes sometimes returns a few more results than the `limit` asked for. That's normal.
- Descriptions from iTunes contain HTML. They're stripped to plain text and shown with
  `{{ }}`, never `v-html`.
