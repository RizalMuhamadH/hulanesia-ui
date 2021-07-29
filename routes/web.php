<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReadController;
use App\Http\Controllers\PageController;
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
Route::get('/post/read/{post:id}/{date}/{slug}', [ReadController::class, 'index'])->name('read');
Route::get('/category/{category:slug}', [CategoryController::class, 'index'])->name('category');
Route::get('/tag/{tag:slug}', [TagController::class, 'index'])->name('tag');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/page/{setting:slug}', [PageController::class, 'index'])->name('page');
