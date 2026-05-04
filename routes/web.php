<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Quran\QuranContentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('quran-api')->group(function () {
        Route::get('/chapters', [QuranContentController::class, 'chapters'])->name('quran.chapters');
        Route::get('/resources/{type}', [QuranContentController::class, 'resources'])->name('quran.resources');
        Route::get('/verses/chapter/{chapterNumber}', [QuranContentController::class, 'versesByChapter'])->name('quran.verses.chapter');
        Route::get('/verses/key/{verseKey}', [QuranContentController::class, 'verseByKey'])->name('quran.verses.key');
    });
});

require __DIR__.'/auth.php';
