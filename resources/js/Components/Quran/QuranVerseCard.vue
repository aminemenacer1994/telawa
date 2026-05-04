<script setup>
import { computed } from 'vue';

const props = defineProps({
    verse: {
        type: Object,
        required: true,
    },
    surahName: {
        type: String,
        required: true,
    },
    selectedAyahKey: {
        type: String,
        required: true,
    },
    showTranslation: {
        type: Boolean,
        required: true,
    },
    showTajweed: {
        type: Boolean,
        required: true,
    },
    showWordByWord: {
        type: Boolean,
        required: true,
    },
    activeWordKey: {
        type: String,
        default: null,
    },
    translationError: {
        type: String,
        default: null,
    },
    tafsirError: {
        type: String,
        default: null,
    },
    translationLoading: {
        type: Boolean,
        default: false,
    },
    tafsirLoading: {
        type: Boolean,
        default: false,
    },
    tafsirExpanded: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits([
    'select-ayah',
    'play-ayah',
    'play-word',
    'toggle-tafsir',
    'retry-translation',
    'retry-tafsir',
]);

const isSelected = computed(() => props.selectedAyahKey === props.verse.verse_key);
const words = computed(() => {
    return (props.verse.words || []).filter((item) => item.char_type_name === 'word');
});

const translationText = computed(() => {
    const translation = props.verse.translations?.[0];
    return translation?.text || null;
});

const tafsirItem = computed(() => {
    return props.verse.tafsirs?.[0] || null;
});

const tajweedHtml = computed(() => {
    const tajweed = props.verse.text_uthmani_tajweed;

    if (!props.showTajweed || !tajweed) {
        return escapeHtml(props.verse.text_uthmani || '');
    }

    return sanitizeTajweedHtml(tajweed);
});

function sanitizeTajweedHtml(raw) {
    return raw
        .replace(/<tajweed class=(["']?)([\w-]+)\1>/g, '<span class="quran-tajweed $2">')
        .replace(/<span class=end>/g, '<span class="quran-ayah-end">')
        .replace(/<\/tajweed>/g, '</span>')
        .replace(/<(?!\/?span\b)[^>]+>/g, '');
}

function escapeHtml(raw) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };

    return String(raw).replace(/[&<>"']/g, (item) => map[item]);
}

function wordTooltip(word) {
    const meaning = word.translation?.text || 'Meaning unavailable';
    const transliteration = word.transliteration?.text ? ` (${word.transliteration.text})` : '';
    return `${meaning}${transliteration}`;
}
</script>

<template>
    <article
        class="quran-verse-card"
        :class="{ 'is-selected': isSelected }"
        @click="emit('select-ayah', verse)"
    >
        <div class="d-flex justify-content-between align-items-start gap-3">
            <div>
                <div class="quran-verse-key">{{ verse.verse_key }}</div>
                <div class="quran-verse-meta">{{ surahName }} • Ayah {{ verse.verse_number }}</div>
            </div>
            <button
                class="btn btn-sm quran-icon-btn"
                type="button"
                @click.stop="emit('play-ayah', verse)"
            >
                <i class="bi bi-play-circle" />
            </button>
        </div>

        <div
            class="quran-arabic-text"
            dir="rtl"
            v-html="tajweedHtml"
        />

        <div
            v-if="showWordByWord"
            class="quran-word-grid"
        >
            <button
                v-for="word in words"
                :key="`${verse.verse_key}-${word.position}`"
                type="button"
                class="quran-word-chip"
                :class="{ 'is-active': activeWordKey === `${verse.verse_key}:${word.position}` }"
                :title="wordTooltip(word)"
                @click.stop="emit('play-word', { verse, word })"
            >
                <span class="quran-word-ar">{{ word.text_uthmani }}</span>
                <span class="quran-word-en">{{ word.translation?.text || '—' }}</span>
            </button>
        </div>

        <div v-if="showTranslation" class="mt-3">
            <div
                v-if="translationLoading"
                class="quran-inline-state"
            >
                Loading translation...
            </div>
            <template v-else-if="translationText">
                <div class="quran-translation-text" v-html="translationText" />
            </template>
            <template v-else>
                <div class="quran-inline-state">
                    <span>{{ translationError || 'Translation unavailable.' }}</span>
                    <button
                        class="btn btn-sm btn-outline-secondary ms-2"
                        type="button"
                        @click.stop="emit('retry-translation', verse)"
                    >
                        Retry
                    </button>
                </div>
            </template>
        </div>

        <div class="mt-3">
            <button
                class="btn btn-sm quran-link-btn"
                type="button"
                @click.stop="emit('toggle-tafsir', verse)"
            >
                {{ tafsirExpanded ? 'Hide tafsir' : 'Show tafsir' }}
            </button>

            <div
                v-if="tafsirExpanded"
                class="quran-tafsir-box mt-2"
            >
                <div
                    v-if="tafsirLoading"
                    class="quran-inline-state"
                >
                    Loading tafsir...
                </div>
                <template v-else-if="tafsirItem">
                    <div class="quran-tafsir-title">{{ tafsirItem.name || 'Tafsir' }}</div>
                    <div class="quran-tafsir-body" v-html="tafsirItem.text" />
                </template>
                <template v-else>
                    <div class="quran-inline-state">
                        <span>{{ tafsirError || 'Tafsir unavailable.' }}</span>
                        <button
                            class="btn btn-sm btn-outline-secondary ms-2"
                            type="button"
                            @click.stop="emit('retry-tafsir', verse)"
                        >
                            Retry
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </article>
</template>
