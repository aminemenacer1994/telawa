<script setup>
import { computed, ref } from 'vue';
import { useQuranAudioStore } from '@/quran/stores/quranAudioStore';

const audioStore = useQuranAudioStore();
audioStore.initialize();

const ui = computed(() => audioStore.state);
const menuOpen = ref(false);

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const durationLabel = computed(() => formatTime(ui.value.duration));
const currentLabel = computed(() => formatTime(ui.value.currentTime));
const progressPercent = computed(() => {
    if (!ui.value.duration) {
        return 0;
    }

    return Math.min((ui.value.currentTime / ui.value.duration) * 100, 100);
});

function formatTime(rawSeconds) {
    const total = Math.max(Math.floor(rawSeconds || 0), 0);
    const minutes = Math.floor(total / 60).toString().padStart(2, '0');
    const seconds = (total % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function onSeek(event) {
    audioStore.seekTo(Number(event.target.value));
}

function onSpeedChange(event) {
    audioStore.setPlaybackRate(Number(event.target.value));
}

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

function closePlayer() {
    audioStore.closePlayer();
    menuOpen.value = false;
}
</script>

<template>
    <transition name="quran-player-fade">
        <div
            v-if="ui.visible"
            class="quran-global-player"
            role="region"
            aria-label="Global Quran Audio Player"
        >
            <div class="container-fluid">
                <div class="row g-2 align-items-center">
                    <div class="col-12 col-md-4">
                        <div class="d-flex align-items-center gap-2">
                            <button
                                class="btn btn-sm quran-control-btn"
                                type="button"
                                @click="audioStore.togglePlayPause"
                            >
                                <i
                                    class="bi"
                                    :class="ui.isPlaying ? 'bi-pause-fill' : 'bi-play-fill'"
                                />
                            </button>
                            <div class="quran-player-meta">
                                <div class="quran-player-title">
                                    {{ ui.currentVerse?.surahName || 'No ayah selected' }}
                                </div>
                                <div class="quran-player-subtitle">
                                    <span v-if="ui.currentVerse">
                                        Ayah {{ ui.currentVerse.ayahNumber }}
                                    </span>
                                    <span v-else>Select any ayah to begin</span>
                                    <span
                                        v-if="ui.mode === 'word' && ui.currentVerse"
                                        class="quran-player-pill"
                                    >
                                        Word preview
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-5">
                        <div class="d-flex align-items-center gap-2">
                            <span class="quran-time">{{ currentLabel }}</span>
                            <input
                                class="form-range quran-player-range"
                                type="range"
                                min="0"
                                :max="ui.duration || 0"
                                :value="ui.currentTime"
                                step="0.1"
                                :style="{ '--progress': `${progressPercent}%` }"
                                @input="onSeek"
                            >
                            <span class="quran-time">{{ durationLabel }}</span>
                        </div>
                    </div>

                    <div class="col-12 col-md-3">
                        <div class="d-flex align-items-center justify-content-md-end gap-2">
                            <select
                                class="form-select form-select-sm quran-speed-select"
                                :value="ui.playbackRate"
                                @change="onSpeedChange"
                            >
                                <option
                                    v-for="speed in playbackSpeeds"
                                    :key="speed"
                                    :value="speed"
                                >
                                    {{ speed }}x
                                </option>
                            </select>

                            <div class="position-relative">
                                <button
                                    class="btn btn-sm quran-ellipsis-btn"
                                    type="button"
                                    @click="toggleMenu"
                                >
                                    <i class="bi bi-three-dots" />
                                </button>
                                <div
                                    v-if="menuOpen"
                                    class="quran-menu"
                                >
                                    <button
                                        class="quran-menu-item"
                                        type="button"
                                        @click="closePlayer"
                                    >
                                        Close player
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="ui.lastError"
                    class="quran-player-error mt-2"
                >
                    {{ ui.lastError }}
                </div>
            </div>
        </div>
    </transition>
</template>
