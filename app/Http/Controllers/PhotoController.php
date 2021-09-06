<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use MeiliSearch\Client;

class PhotoController extends Controller
{
    public function index()
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');

        $recent = $client->index('photo')->search('', ['limit' => 21, 'attributesToRetrieve' => [
            'id',
            'title',
            'slug',
            'user_id',
            'user_name',
            'images',
            'created_at',
            'timestamp'
        ]])->getRaw();

        $popular =$client->index('post-popular')->search('', ['limit' => 5, 'filters' => 'period = '.Carbon::now()->format('mY'), 'attributesToRetrieve' => [
            'id',
            'title',
            'slug',
            'description',
            'feature_id',
            'category_id',
            'category_name',
            'user_id',
            'user',
            'status',
            'image',
            'created_at',
            'timestamp'
        ]])->getRaw();

        $menu = $client->index('category')->search('', ['filters' => 'order > 0'])->getRaw();

        return view('photo', compact(['recent', 'popular', 'menu']));
    }

    public function detail($id, $date, $slug)
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');

        $data = $client->index('photo')->search('', ['filters' => 'id = '.$id])->getRaw();

        abort_if(count($data['hits']) == 0, 404);

        $photo = $data['hits'][0];

        $recent = $client->index('photo')->search('', ['limit' => 12, 'attributesToRetrieve' => [
            'id',
            'title',
            'slug',
            'user_id',
            'user_name',
            'image',
            'created_at',
            'timestamp'
        ]])->getRaw();

        $menu = $client->index('category')->search('', ['filters' => 'order > 0'])->getRaw();

        return view('detail-photo', compact(['photo', 'recent', 'menu']));
    }
}
