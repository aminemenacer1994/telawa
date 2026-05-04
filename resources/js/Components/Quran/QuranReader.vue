<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import QuranVerseCard from '@/Components/Quran/QuranVerseCard.vue';
import { fetchChapters, fetchResources, fetchVerseByKey, fetchVersesByChapter } from '@/quran/api/quranApi';
import { useQuranAudioStore } from '@/quran/stores/quranAudioStore';
import { useQuranStateStore } from '@/quran/stores/quranStateStore';
import { useQuranThemeStore } from '@/quran/stores/quranThemeStore';

const quranState = useQuranStateStore();
const themeStore = useQuranThemeStore();
const audioStore = useQuranAudioStore();

quranState.initialize();
themeStore.initialize();
audioStore.initialize();

const chapters = ref([]);
const translations = ref([]);
const tafsirs = ref([]);
const recitations = ref([]);

const verses = ref([]);
const pagination = reactive({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
});

const loadingResources = ref(false);
const loadingVerses = ref(false);
const resourceError = ref(null);
const versesError = ref(null);

const translationLoadingByKey = reactive({});
const translationErrorByKey = reactive({});
const tafsirLoadingByKey = reactive({});
const tafsirErrorByKey = reactive({});
const tafsirExpandedByKey = reactive({});

const ui = computed(() => quranState.state);
const player = computed(() => audioStore.state);

const selectedSurah = computed(() => Number(ui.value.selectedSurahId || 1));
const selectedTranslationId = computed(() => ui.value.selectedTranslationId);
const selectedTafsirId = computed(() => ui.value.selectedTafsirId);
const selectedRecitationId = computed(() => ui.value.selectedRecitationId);

const surahName = computed(() => {
    const chapter = chapters.value.find((item) => Number(item.id) === selectedSurah.value);
    if (!chapter) {
        return `Surah ${selectedSurah.value}`;
    }

    return chapter.name_simple || chapter.name_complex || chapter.translated_name?.name || `Surah ${selectedSurah.value}`;
});

const hasPrevPage = computed(() => pagination.currentPage > 1);
const hasNextPage = computed(() => pagination.currentPage < pagination.totalPages);

onMounted(async () => {
    await loadBootstrapData();
});

async function loadBootstrapData() {
    loadingResources.value = true;
    resourceError.value = null;

    try {
        const [chapterData, translationData, tafsirData, recitationData] = await Promise.all([
            fetchChapters(),
            fetchResources('translations'),
            fetchResources('tafsirs'),
            fetchResources('recitations'),
        ]);

        chapters.value = chapterData?.chapters || [];
        translations.value = translationData?.translations || [];
        tafsirs.value = tafsirData?.tafsirs || [];
        recitations.value = recitationData?.recitations || [];

        setDefaultResources();
        await loadVerses({ includeTranslations: ui.value.showTranslation });
    } catch (error) {
        resourceError.value = error.message;
    } finally {
        loadingResources.value = false;
    }
}

function setDefaultResources() {
    if (!selectedTranslationId.value && translations.value.length > 0) {
        const english = translations.value.find((item) => String(item.language_name || '').toLowerCase() === 'english');
        quranState.setSelectedTranslation(english?.id || translations.value[0].id);
    }

    if (!selectedTafsirId.value && tafsirs.value.length > 0) {
        const english = tafsirs.value.find((item) => String(item.language_name || '').toLowerCase() === 'english');
        quranState.setSelectedTafsir(english?.id || tafsirs.value[0].id);
    }

    if (!selectedRecitationId.value && recitations.value.length > 0) {
        quranState.setSelectedRecitation(recitations.value[0].id);
    }
}

async function loadVerses({ includeTranslations = false } = {}) {
    loadingVerses.value = true;
    versesError.value = null;

    try {
        const page = quranState.getSurahPage(selectedSurah.value);

        const params = {
            page,
            per_page: pagination.perPage,
            words: true,
            fields: 'text_uthmani,text_uthmani_tajweed,verse_key,verse_number',
            word_fields: 'text_uthmani,position,audio_url,translation,transliteration,char_type_name',
        };

        if (selectedRecitationId.value) {
            params.audio = selectedRecitationId.value;
        }

        if (includeTranslations && selectedTranslationId.value) {
            params.translations = selectedTranslationId.value;
            params.translation_fields = 'resource_name,language_name';
        }

        const payload = await fetchVersesByChapter(selectedSurah.value, params);

        verses.value = (payload?.verses || []).map((verse) => ({
            ...verse,
            words: verse.words || [],
            translations: verse.translations || [],
            tafsirs: verse.tafsirs || [],
        }));

        const responsePagination = payload?.pagination || {};
        pagination.currentPage = Number(responsePagination.current_page || page || 1);
        pagination.totalPages = Number(responsePagination.total_pages || responsePagination['total_pages='] || 1);

        const selectedKey = ui.value.selectedAyahKey;
        const hasSelectedAyah = verses.value.some((verse) => verse.verse_key === selectedKey);

        if (!hasSelectedAyah && verses.value.length > 0) {
            quranState.setSelectedAyah(verses.value[0].verse_key);
        }
    } catch (error) {
        versesError.value = error.message;
    } finally {
        loadingVerses.value = false;
    }
}

function onSurahChange(event) {
    const surahId = Number(event.target.value);
    quranState.setSelectedSurah(surahId);
    quranState.setSurahPage(surahId, 1);
    quranState.setSelectedAyah(`${surahId}:1`);
    resetVerseMetaStates();
    loadVerses({ includeTranslations: ui.value.showTranslation });
}

function onRecitationChange(event) {
    quranState.setSelectedRecitation(Number(event.target.value));
    loadVerses({ includeTranslations: ui.value.showTranslation });
}

function onTranslationResourceChange(event) {
    quranState.setSelectedTranslation(Number(event.target.value));
    if (ui.value.showTranslation) {
        loadVerses({ includeTranslations: true });
    }
}

function onTafsirResourceChange(event) {
    quranState.setSelectedTafsir(Number(event.target.value));
    Object.keys(tafsirExpandedByKey).forEach((key) => {
        tafsirExpandedByKey[key] = false;
    });
}

function onThemeChange(event) {
    themeStore.setTheme(event.target.value);
}

function onToggleTranslation(event) {
    quranState.setShowTranslation(event.target.checked);

    if (event.target.checked) {
        loadVerses({ includeTranslations: true });
    }
}

function onToggleTajweed(event) {
    quranState.setShowTajweed(event.target.checked);
}

function onToggleWordByWord(event) {
    quranState.setShowWordByWord(event.target.checked);
}

function onSelectAyah(verse) {
    quranState.setSelectedAyah(verse.verse_key);
    audioStore.syncSelection({
        verseKey: verse.verse_key,
        surahName: surahName.value,
        ayahNumber: verse.verse_number,
    });
}

async function onPlayAyah(verse) {
    quranState.setSelectedAyah(verse.verse_key);

    await audioStore.playVerse({
        verseKey: verse.verse_key,
        surahName: surahName.value,
        ayahNumber: verse.verse_number,
        audioUrl: verse.audio?.url,
        segments: verse.audio?.segments || [],
    });
}

async function onPlayWord({ verse, word }) {
    quranState.setSelectedAyah(verse.verse_key);

    await audioStore.playWord({
        verseKey: verse.verse_key,
        surahName: surahName.value,
        ayahNumber: verse.verse_number,
        wordPosition: word.position,
        audioUrl: word.audio_url,
    });
}

async function goToPage(page) {
    quranState.setSurahPage(selectedSurah.value, page);
    await loadVerses({ includeTranslations: ui.value.showTranslation });
}

async function toggleTafsir(verse) {
    const verseKey = verse.verse_key;
    tafsirExpandedByKey[verseKey] = !tafsirExpandedByKey[verseKey];

    if (tafsirExpandedByKey[verseKey] && (!verse.tafsirs || verse.tafsirs.length === 0)) {
        await loadTafsir(verseKey);
    }
}

async function loadTranslation(verseKey) {
    if (!selectedTranslationId.value) {
        return;
    }

    translationLoadingByKey[verseKey] = true;
    translationErrorByKey[verseKey] = null;

    try {
        const payload = await fetchVerseByKey(verseKey, {
            words: false,
            translations: selectedTranslationId.value,
            translation_fields: 'resource_name,language_name',
        });

        const verse = verses.value.find((item) => item.verse_key === verseKey);
        if (!verse) {
            return;
        }

        verse.translations = payload?.verse?.translations || [];
    } catch (error) {
        translationErrorByKey[verseKey] = error.message;
    } finally {
        translationLoadingByKey[verseKey] = false;
    }
}

async function loadTafsir(verseKey) {
    if (!selectedTafsirId.value) {
        return;
    }

    tafsirLoadingByKey[verseKey] = true;
    tafsirErrorByKey[verseKey] = null;

    try {
        const payload = await fetchVerseByKey(verseKey, {
            words: false,
            tafsirs: selectedTafsirId.value,
            tafsir_fields: 'language_name,name',
        });

        const verse = verses.value.find((item) => item.verse_key === verseKey);
        if (!verse) {
            return;
        }

        verse.tafsirs = payload?.verse?.tafsirs || [];
    } catch (error) {
        tafsirErrorByKey[verseKey] = error.message;
    } finally {
        tafsirLoadingByKey[verseKey] = false;
    }
}

function resetVerseMetaStates() {
    Object.keys(translationLoadingByKey).forEach((key) => {
        delete translationLoadingByKey[key];
        delete translationErrorByKey[key];
        delete tafsirLoadingByKey[key];
        delete tafsirErrorByKey[key];
        delete tafsirExpandedByKey[key];
    });
}

function translationLabel(item) {
    const name = item.translated_name?.name || item.name || 'Translation';
    const author = item.author_name ? ` - ${item.author_name}` : '';
    return `${name}${author}`;
}

function tafsirLabel(item) {
    const name = item.translated_name?.name || item.name || 'Tafsir';
    const author = item.author_name ? ` - ${item.author_name}` : '';
    return `${name}${author}`;
}

function recitationLabel(item) {
    const displayName = item.translated_name?.name || item.reciter_name || `Recitation ${item.id}`;
    return item.style ? `${displayName} (${item.style})` : displayName;
}
</script>

<template>
    <section class="quran-shell container-fluid py-4">
        <div class="row g-3">
            <div class="col-12">
                <div class="quran-panel p-3 p-lg-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-12 col-md-4 col-lg-3">
                            <label class="form-label">Surah</label>
                            <select
                                class="form-select"
                                :value="selectedSurah"
                                :disabled="loadingResources"
                                @change="onSurahChange"
                            >
                                <option
                                    v-for="chapter in chapters"
                                    :key="chapter.id"
                                    :value="chapter.id"
                                >
                                    {{ chapter.id }}. {{ chapter.name_simple }}
                                </option>
                            </select>
                        </div>

                        <div class="col-12 col-md-4 col-lg-3">
                            <label class="form-label">Recitation</label>
                            <select
                                class="form-select"
                                :value="selectedRecitationId || ''"
                                :disabled="loadingResources"
                                @change="onRecitationChange"
                            >
                                <option
                                    v-for="recitation in recitations"
                                    :key="recitation.id"
                                    :value="recitation.id"
                                >
                                    {{ recitationLabel(recitation) }}
                                </option>
                            </select>
                        </div>

                        <div class="col-12 col-md-4 col-lg-3">
                            <label class="form-label">Translation</label>
                            <select
                                class="form-select"
                                :value="selectedTranslationId || ''"
                                :disabled="loadingResources"
                                @change="onTranslationResourceChange"
                            >
                                <option
                                    v-for="translation in translations"
                                    :key="translation.id"
                                    :value="translation.id"
                                >
                                    {{ translationLabel(translation) }}
                                </option>
                            </select>
                        </div>

                        <div class="col-12 col-md-4 col-lg-3">
                            <label class="form-label">Tafsir</label>
                            <select
                                class="form-select"
                                :value="selectedTafsirId || ''"
                                :disabled="loadingResources"
                                @change="onTafsirResourceChange"
                            >
                                <option
                                    v-for="tafsir in tafsirs"
                                    :key="tafsir.id"
                                    :value="tafsir.id"
                                >
                                    {{ tafsirLabel(tafsir) }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="row g-3 mt-1">
                        <div class="col-12 col-lg-8">
                            <div class="d-flex flex-wrap gap-3">
                                <div class="form-check form-switch">
                                    <input
                                        id="toggleTranslation"
                                        class="form-check-input"
                                        type="checkbox"
                                        :checked="ui.showTranslation"
                                        @change="onToggleTranslation"
                                    >
                                    <label class="form-check-label" for="toggleTranslation">Translation</label>
                                </div>

                                <div class="form-check form-switch">
                                    <input
                                        id="toggleTajweed"
                                        class="form-check-input"
                                        type="checkbox"
                                        :checked="ui.showTajweed"
                                        @change="onToggleTajweed"
                                    >
                                    <label class="form-check-label" for="toggleTajweed">Tajweed</label>
                                </div>

                                <div class="form-check form-switch">
                                    <input
                                        id="toggleWordByWord"
                                        class="form-check-input"
                                        type="checkbox"
                                        :checked="ui.showWordByWord"
                                        @change="onToggleWordByWord"
                                    >
                                    <label class="form-check-label" for="toggleWordByWord">Word by word</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-4">
                            <label class="form-label">Theme</label>
                            <select
                                class="form-select"
                                :value="themeStore.state.currentTheme"
                                @change="onThemeChange"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="sepia">Sepia</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div
                    v-if="resourceError"
                    class="quran-fallback-box"
                >
                    <p class="mb-2">{{ resourceError }}</p>
                    <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm"
                        @click="loadBootstrapData"
                    >
                        Retry
                    </button>
                </div>

                <div
                    v-else-if="versesError"
                    class="quran-fallback-box"
                >
                    <p class="mb-2">{{ versesError }}</p>
                    <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm"
                        @click="loadVerses({ includeTranslations: ui.showTranslation })"
                    >
                        Retry
                    </button>
                </div>

                <div v-else>
                    <div
                        v-if="loadingVerses"
                        class="quran-fallback-box"
                    >
                        Loading verses...
                    </div>

                    <div
                        v-else
                        class="row g-3"
                    >
                        <div
                            v-for="verse in verses"
                            :key="verse.verse_key"
                            class="col-12"
                        >
                            <QuranVerseCard
                                :verse="verse"
                                :surah-name="surahName"
                                :selected-ayah-key="ui.selectedAyahKey"
                                :show-translation="ui.showTranslation"
                                :show-tajweed="ui.showTajweed"
                                :show-word-by-word="ui.showWordByWord"
                                :active-word-key="player.activeWordKey"
                                :translation-loading="Boolean(translationLoadingByKey[verse.verse_key])"
                                :translation-error="translationErrorByKey[verse.verse_key] || null"
                                :tafsir-loading="Boolean(tafsirLoadingByKey[verse.verse_key])"
                                :tafsir-error="tafsirErrorByKey[verse.verse_key] || null"
                                :tafsir-expanded="Boolean(tafsirExpandedByKey[verse.verse_key])"
                                @select-ayah="onSelectAyah"
                                @play-ayah="onPlayAyah"
                                @play-word="onPlayWord"
                                @toggle-tafsir="toggleTafsir"
                                @retry-translation="loadTranslation(verse.verse_key)"
                                @retry-tafsir="loadTafsir(verse.verse_key)"
                            />
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between mt-3">
                        <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                            :disabled="!hasPrevPage || loadingVerses"
                            @click="goToPage(pagination.currentPage - 1)"
                        >
                            Previous
                        </button>

                        <span class="quran-page-indicator">
                            Page {{ pagination.currentPage }} / {{ pagination.totalPages }}
                        </span>

                        <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                            :disabled="!hasNextPage || loadingVerses"
                            @click="goToPage(pagination.currentPage + 1)"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
