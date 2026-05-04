import axios from 'axios';

const client = axios.create({
    baseURL: '/quran-api',
    timeout: 20000,
});

const getErrorMessage = (error, fallbackMessage) => {
    return (
        error?.response?.data?.message
        || error?.message
        || fallbackMessage
    );
};

export const fetchChapters = async () => {
    try {
        const { data } = await client.get('/chapters');
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error, 'Failed to load chapters.'));
    }
};

export const fetchResources = async (type) => {
    try {
        const { data } = await client.get(`/resources/${type}`);
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error, `Failed to load ${type}.`));
    }
};

export const fetchVersesByChapter = async (chapterNumber, options = {}) => {
    try {
        const { data } = await client.get(`/verses/chapter/${chapterNumber}`, {
            params: options,
        });
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error, 'Failed to load verses.'));
    }
};

export const fetchVerseByKey = async (verseKey, options = {}) => {
    try {
        const { data } = await client.get(`/verses/key/${encodeURIComponent(verseKey)}`, {
            params: options,
        });
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error, 'Failed to load verse.'));
    }
};
