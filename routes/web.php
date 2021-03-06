<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReadController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/tag/{slug}', [TagController::class, 'index'])->name('tag');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/page/{slug}', [PageController::class, 'index'])->name('page');
Route::get('/photo', [PhotoController::class, 'index'])->name('photo.index');
Route::get('/photo/{id}/{date}/{slug}', [PhotoController::class, 'detail'])->name('photo.read');
Route::get('/{slug}', [CategoryController::class, 'index'])->name('category');
Route::get('/{category}/{id}/{date}/{slug}', [ReadController::class, 'index'])->name('read');

