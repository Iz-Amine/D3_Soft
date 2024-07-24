<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
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
});

// Route::get('/roles', function () {
//     return Inertia::render('Roles_Permission/Roles_Permission');
// })->middleware(['auth', 'verified'])->name('roles');

// Routes pour la gestion des rôles
Route::middleware(['auth', 'verified'])->group(function () {
    // Afficher la liste des rôles
    Route::get('/roles', [RoleController::class, 'index'])->name('roles');

    // Créer un nouveau rôle
    Route::post('/role/store', [RoleController::class, 'store'])->name('role.store');

    // Afficher un rôle spécifique
    Route::get('/role/{id}', [RoleController::class, 'show'])->name('role.show');

    // Mettre à jour un rôle existant
    Route::post('/role/update/{role}', [RoleController::class, 'update'])->name('role.update');

    // Supprimer un rôle
    Route::delete('/role/{id}', [RoleController::class, 'destroy'])->name('role.destroy'); 
});


Route::get('/Test', function () {
    return Inertia::render('Test');
});

// Route::get('/Create-role', function () {
//     $user = auth()->user();
//     $user->assignRole('User');
//     return $user;
//     // return Inertia::render('Create-role');
// });



require __DIR__.'/auth.php';
