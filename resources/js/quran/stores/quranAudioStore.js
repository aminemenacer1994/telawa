import { reactive, readonly } from 'vue';

const STORAGE_KEY = 'quran.audio-state';
const CDN_BASE = 'https://audio.qurancdn.com';

const audio = new Audio();
audio.preload = 'none';
audio.crossOrigin = 'anonymous';

const persisted = (() => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
        return {};
    }
})();

const state = reactive({
    hydrated: false,
    visible: persisted.visible ?? true,
    mode: persisted.mode ?? 'verse',
    isPlaying: false,
    currentTime: Number(persisted.currentTime ?? 0),
    duration: 0,
    playbackRate: Number(persisted.playbackRate ?? 1),
    currentVerse: persisted.currentVerse ?? null,
    sourceUrl: persisted.sourceUrl ?? null,
    activeWordKey: persisted.activeWordKey ?? null,
    segmentMap: [],
    lastError: null,
});

const persist = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        visible: state.visible,
        mode: state.mode,
        playbackRate: state.playbackRate,
        currentVerse: state.currentVerse,
        sourceUrl: state.sourceUrl,
        activeWordKey: state.activeWordKey,
        currentTime: state.currentTime,
    }));
};

const normalizeAudioUrl = (url) => {
    if (!url) {
        return null;
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    if (url.startsWith('//')) {
        return `https:${url}`;
    }

    const trimmed = url.startsWith('/') ? url.slice(1) : url;
    return `${CDN_BASE}/${trimmed}`;
};

const normalizeSegments = (segments = []) => {
    if (!Array.isArray(segments)) {
        return [];
    }

    return segments
        .map((segment) => {
            if (!Array.isArray(segment) || segment.length < 4) {
                return null;
            }

            return {
                wordPosition: Number(segment[1]),
                startMs: Number(segment[2]),
                endMs: Number(segment[3]),
            };
        })
        .filter((segment) => segment && segment.wordPosition > 0 && segment.endMs >= segment.startMs);
};

const updateActiveWordByTime = () => {
    if (!state.currentVerse || state.segmentMap.length === 0) {
        if (state.mode === 'verse') {
            state.activeWordKey = null;
        }
        return;
    }

    const now = state.currentTime * 1000;
    const matched = state.segmentMap.find((segment) => now >= segment.startMs && now <= segment.endMs);

    state.activeWordKey = matched
        ? `${state.currentVerse.verseKey}:${matched.wordPosition}`
        : null;
};

const attachListeners = () => {
    let lastPersistedTime = Number(state.currentTime || 0);

    audio.addEventListener('play', () => {
        state.isPlaying = true;
    });

    audio.addEventListener('pause', () => {
        state.isPlaying = false;
        persist();
    });

    audio.addEventListener('ended', () => {
        state.isPlaying = false;
        state.activeWordKey = null;
        state.currentTime = 0;
        persist();
    });

    audio.addEventListener('timeupdate', () => {
        state.currentTime = audio.currentTime || 0;
        updateActiveWordByTime();
        if (Math.abs(state.currentTime - lastPersistedTime) >= 2) {
            lastPersistedTime = state.currentTime;
            persist();
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        state.duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    });

    audio.addEventListener('ratechange', () => {
        state.playbackRate = audio.playbackRate;
        persist();
    });

    audio.addEventListener('error', () => {
        state.lastError = 'Audio playback failed.';
        state.isPlaying = false;
    });
};

const setSource = async (url, { autoPlay = true, startAt = 0 } = {}) => {
    const resolvedUrl = normalizeAudioUrl(url);

    if (!resolvedUrl) {
        state.lastError = 'Audio is not available for this selection.';
        return false;
    }

    state.lastError = null;
    state.sourceUrl = resolvedUrl;
    audio.src = resolvedUrl;
    audio.playbackRate = state.playbackRate;

    if (startAt > 0) {
        const seekOnLoad = () => {
            audio.currentTime = startAt;
            audio.removeEventListener('loadedmetadata', seekOnLoad);
        };
        audio.addEventListener('loadedmetadata', seekOnLoad);
    }

    if (!autoPlay) {
        persist();
        return true;
    }

    try {
        await audio.play();
        persist();
        return true;
    } catch {
        state.lastError = 'Autoplay blocked. Press play to start audio.';
        persist();
        return false;
    }
};

const initialize = () => {
    if (state.hydrated) {
        return;
    }

    attachListeners();

    const boundedSpeed = Math.min(Math.max(state.playbackRate, 0.5), 2);
    state.playbackRate = boundedSpeed;
    audio.playbackRate = boundedSpeed;

    if (state.sourceUrl) {
        audio.src = state.sourceUrl;
        if (state.currentTime > 0) {
            const seekOnLoad = () => {
                audio.currentTime = state.currentTime;
                audio.removeEventListener('loadedmetadata', seekOnLoad);
            };
            audio.addEventListener('loadedmetadata', seekOnLoad);
        }
    }

    state.hydrated = true;
    persist();
};

const playVerse = async ({
    verseKey,
    surahName,
    ayahNumber,
    audioUrl,
    segments,
}) => {
    state.mode = 'verse';
    state.visible = true;
    state.currentVerse = {
        verseKey,
        surahName,
        ayahNumber,
    };
    state.segmentMap = normalizeSegments(segments);
    state.activeWordKey = null;

    persist();
    return setSource(audioUrl, { autoPlay: true, startAt: 0 });
};

const playWord = async ({
    verseKey,
    surahName,
    ayahNumber,
    wordPosition,
    audioUrl,
}) => {
    state.mode = 'word';
    state.visible = true;
    state.currentVerse = {
        verseKey,
        surahName,
        ayahNumber,
    };
    state.segmentMap = [];
    state.activeWordKey = `${verseKey}:${wordPosition}`;

    persist();
    return setSource(audioUrl, { autoPlay: true, startAt: 0 });
};

const togglePlayPause = async () => {
    if (!audio.src) {
        state.lastError = 'Select an ayah to start playback.';
        return;
    }

    if (audio.paused) {
        try {
            await audio.play();
        } catch {
            state.lastError = 'Playback is blocked. Try interacting with the page first.';
        }
        return;
    }

    audio.pause();
};

const seekTo = (nextTime) => {
    if (!audio.src || !Number.isFinite(nextTime)) {
        return;
    }

    audio.currentTime = Math.max(0, nextTime);
    state.currentTime = audio.currentTime;
    updateActiveWordByTime();
    persist();
};

const setPlaybackRate = (nextRate) => {
    const bounded = Math.min(Math.max(Number(nextRate), 0.5), 2);
    state.playbackRate = bounded;
    audio.playbackRate = bounded;
    persist();
};

const closePlayer = () => {
    audio.pause();
    state.visible = false;
    persist();
};

const showPlayer = () => {
    state.visible = true;
    persist();
};

const syncSelection = ({ verseKey, surahName, ayahNumber }) => {
    state.currentVerse = {
        verseKey,
        surahName,
        ayahNumber,
    };
    state.visible = true;
    persist();
};

export const useQuranAudioStore = () => {
    return {
        state: readonly(state),
        initialize,
        playVerse,
        playWord,
        togglePlayPause,
        seekTo,
        setPlaybackRate,
        closePlayer,
        showPlayer,
        syncSelection,
    };
};
