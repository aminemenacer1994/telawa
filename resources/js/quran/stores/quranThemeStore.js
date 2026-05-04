import { reactive, readonly } from 'vue';

const STORAGE_KEY = 'quran.theme';
const THEMES = ['light', 'dark', 'sepia'];

const state = reactive({
    currentTheme: 'light',
    ready: false,
});

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-quran-theme', theme);
};

const setTheme = (theme) => {
    const nextTheme = THEMES.includes(theme) ? theme : 'light';
    state.currentTheme = nextTheme;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
};

const initialize = () => {
    if (state.ready) {
        return;
    }

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const initialTheme = THEMES.includes(savedTheme) ? savedTheme : 'light';

    state.currentTheme = initialTheme;
    applyTheme(initialTheme);
    state.ready = true;
};

export const useQuranThemeStore = () => {
    return {
        state: readonly(state),
        themes: THEMES,
        initialize,
        setTheme,
    };
};
