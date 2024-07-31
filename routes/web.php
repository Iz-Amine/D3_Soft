<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\BlocController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjetController::class, 'index'])->name('project.index');
        Route::get('/create', [ProjetController::class, 'create'])->name('projects.create');
        Route::post('/', [ProjetController::class, 'store'])->name('projects.store');
        Route::get('/edit/{idProjet}', [ProjetController::class, 'edit'])->name('projects.edit'); 
        Route::put('/update/{idProjet}', [ProjetController::class, 'update'])->name('projects.update');
        Route::put('/archive/{id}', [ProjetController::class, 'archive'])->name('projects.archive');
        Route::put('/unarchive/{id}', [ProjetController::class, 'unarchive'])->name('projects.unarchive');
        Route::get('/projects/archived', [ProjetController::class, 'archivedProjects'])->name('projects.archived');
        Route::get('/projects', [ProjectController::class, 'index']);
    });

    Route::prefix('blocs')->group(function () {
        Route::get('/', [BlocController::class, 'index'])->name('blocs.index');
        Route::get('/blocs/create', [BlocController::class, 'create'])->name('blocs.create');
        Route::post('/blocs', [BlocController::class, 'store'])->name('blocs.store');
        Route::get('/edit/{id}', [BlocController::class, 'edit'])->name('blocs.edit');
        Route::put('/update/{id}', [BlocController::class, 'update'])->name('blocs.update');
        Route::delete('/destroy/{id}', [BlocController::class, 'destroy'])->name('blocs.destroy');
    });
    
});

Route::get('/Roles_Permission', function () {
    return Inertia::render('Roles_Permission');
})->middleware(['auth', 'verified'])->name('Roles_Permission');

Route::get('/Add', )->middleware(['auth', 'verified'])->name('Add');

Route::get('/Test', function () {
    return Inertia::render('Test');
});
require __DIR__.'/auth.php';
