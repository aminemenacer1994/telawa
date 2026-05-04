import { reactive, readonly } from 'vue';

const STORAGE_KEY = 'quran.ui-state';

const defaults = {
    selectedSurahId: 1,
    selectedAyahKey: '1:1',
    selectedTranslationId: null,
    selectedTafsirId: null,
    selectedRecitationId: null,
    showTranslation: false,
    showTajweed: true,
    showWordByWord: true,
    pageBySurah: {},
};

const loadState = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return {
            ...defaults,
            ...parsed,
            pageBySurah: {
                ...defaults.pageBySurah,
                ...(parsed.pageBySurah || {}),
            },
        };
    } catch {
        return { ...defaults };
    }
};

const state = reactive({
    ...defaults,
    hydrated: false,
});

const persist = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedSurahId: state.selectedSurahId,
        selectedAyahKey: state.selectedAyahKey,
        selectedTranslationId: state.selectedTranslationId,
        selectedTafsirId: state.selectedTafsirId,
        selectedRecitationId: state.selectedRecitationId,
        showTranslation: state.showTranslation,
        showTajweed: state.showTajweed,
        showWordByWord: state.showWordByWord,
        pageBySurah: state.pageBySurah,
    }));
};

const initialize = () => {
    if (state.hydrated) {
        return;
    }

    const loaded = loadState();
    Object.assign(state, loaded);
    state.hydrated = true;
};

const setSelectedSurah = (surahId) => {
    state.selectedSurahId = Number(surahId);
    persist();
};

const setSelectedAyah = (ayahKey) => {
    state.selectedAyahKey = ayahKey;
    persist();
};

const setSelectedTranslation = (resourceId) => {
    state.selectedTranslationId = resourceId ? Number(resourceId) : null;
    persist();
};

const setSelectedTafsir = (resourceId) => {
    state.selectedTafsirId = resourceId ? Number(resourceId) : null;
    persist();
};

const setSelectedRecitation = (resourceId) => {
    state.selectedRecitationId = resourceId ? Number(resourceId) : null;
    persist();
};

const setShowTranslation = (show) => {
    state.showTranslation = Boolean(show);
    persist();
};

const setShowTajweed = (show) => {
    state.showTajweed = Boolean(show);
    persist();
};

const setShowWordByWord = (show) => {
    state.showWordByWord = Boolean(show);
    persist();
};

const setSurahPage = (surahId, page) => {
    state.pageBySurah = {
        ...state.pageBySurah,
        [String(surahId)]: Number(page),
    };
    persist();
};

const getSurahPage = (surahId) => {
    return Number(state.pageBySurah[String(surahId)] || 1);
};

export const useQuranStateStore = () => {
    return {
        state: readonly(state),
        initialize,
        setSelectedSurah,
        setSelectedAyah,
        setSelectedTranslation,
        setSelectedTafsir,
        setSelectedRecitation,
        setShowTranslation,
        setShowTajweed,
        setShowWordByWord,
        setSurahPage,
        getSurahPage,
    };
};
