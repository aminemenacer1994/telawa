<?php

namespace App\Http\Controllers\Quran;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class QuranContentController extends Controller
{
    public function chapters(Request $request): JsonResponse
    {
        return $this->proxy('/chapters', [
            'language' => $request->string('language', 'en')->toString(),
        ]);
    }

    public function resources(Request $request, string $type): JsonResponse
    {
        if (!in_array($type, ['translations', 'tafsirs', 'recitations'], true)) {
            return response()->json([
                'message' => 'Unsupported resource type.',
                'success' => false,
            ], 422);
        }

        return $this->proxy("/resources/{$type}", [
            'language' => $request->string('language', 'en')->toString(),
        ]);
    }

    public function versesByChapter(Request $request, int $chapterNumber): JsonResponse
    {
        if ($chapterNumber < 1 || $chapterNumber > 114) {
            return response()->json([
                'message' => 'Invalid chapter number.',
                'success' => false,
            ], 422);
        }

        $query = [
            'language' => $request->string('language', 'en')->toString(),
            'words' => $request->boolean('words', true) ? 'true' : 'false',
            'page' => max((int) $request->integer('page', 1), 1),
            'per_page' => min(max((int) $request->integer('per_page', 10), 1), 50),
            'fields' => $request->string('fields', 'text_uthmani,text_uthmani_tajweed')->toString(),
            'word_fields' => $request->string('word_fields', 'text_uthmani,position,audio_url,translation,transliteration,char_type_name')->toString(),
            'translation_fields' => $request->string('translation_fields', 'resource_name,language_name')->toString(),
            'tafsir_fields' => $request->string('tafsir_fields', 'language_name,name')->toString(),
        ];

        foreach (['audio', 'translations', 'tafsirs'] as $optionalField) {
            $value = trim((string) $request->query($optionalField, ''));
            if ($value !== '') {
                $query[$optionalField] = $value;
            }
        }

        return $this->proxy("/verses/by_chapter/{$chapterNumber}", $query);
    }

    public function verseByKey(Request $request, string $verseKey): JsonResponse
    {
        if (!preg_match('/^\d{1,3}:\d{1,3}$/', $verseKey)) {
            return response()->json([
                'message' => 'Invalid verse key.',
                'success' => false,
            ], 422);
        }

        $query = [
            'language' => $request->string('language', 'en')->toString(),
            'words' => $request->boolean('words', true) ? 'true' : 'false',
            'fields' => $request->string('fields', 'text_uthmani,text_uthmani_tajweed')->toString(),
            'word_fields' => $request->string('word_fields', 'text_uthmani,position,audio_url,translation,transliteration,char_type_name')->toString(),
            'translation_fields' => $request->string('translation_fields', 'resource_name,language_name')->toString(),
            'tafsir_fields' => $request->string('tafsir_fields', 'language_name,name')->toString(),
        ];

        foreach (['audio', 'translations', 'tafsirs'] as $optionalField) {
            $value = trim((string) $request->query($optionalField, ''));
            if ($value !== '') {
                $query[$optionalField] = $value;
            }
        }

        return $this->proxy("/verses/by_key/{$verseKey}", $query);
    }

    private function proxy(string $path, array $query): JsonResponse
    {
        $baseUrl = rtrim((string) config('services.quran.base_url', 'https://api.quran.com/api/v4'), '/');
        $token = (string) config('services.quran.token', '');
        $clientId = (string) config('services.quran.client_id', '');

        $headers = [
            'Accept' => 'application/json',
        ];

        if ($token !== '') {
            $headers['x-auth-token'] = $token;
            $headers['Authorization'] = "Bearer {$token}";
        }

        if ($clientId !== '') {
            $headers['x-client-id'] = $clientId;
        }

        try {
            $response = Http::withHeaders($headers)
                ->connectTimeout(8)
                ->timeout(20)
                ->get("{$baseUrl}{$path}", $query);
        } catch (\Throwable $exception) {
            return response()->json([
                'message' => 'Quran content service is currently unavailable.',
                'success' => false,
            ], 503);
        }

        if (!$response->successful()) {
            return response()->json([
                'message' => 'Quran content request failed.',
                'success' => false,
                'status' => $response->status(),
            ], $response->status() >= 400 ? $response->status() : 502);
        }

        return response()->json($response->json());
    }
}
