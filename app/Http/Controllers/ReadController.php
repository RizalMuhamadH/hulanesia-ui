<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReadController extends Controller
{
    public function index()
    {
        // views($post)->record();
        return view('read');
    }
}
