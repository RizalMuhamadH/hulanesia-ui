<?php

namespace App\Http\Livewire;

use Livewire\Component;
use MeiliSearch\Client;

class Loadmore extends Component
{
    public $posts = [];
    public $photos = [];
    public $slug;
    public $scaffold;
    public $offset = 20;
    public $offsetPhoto = 21;
    public $isEmpty = false;


    public function loadMore()
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');
        if ($this->scaffold == 'category') {
            $recent = $client->index('post')->search('', ['offset' => $this->offset, 'limit' => 20, 'filters' => 'status = PUBLISH AND category_slug = ' . $this->slug, 'attributesToRetrieve' => [
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
        } else if ($this->scaffold == 'tag') {
            $recent = $client->index('post')->search('', ['offset' => $this->offset, 'limit' => 20, 'filters' => 'status = PUBLISH AND tags_slug = ' . $this->slug, 'attributesToRetrieve' => [
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
        }


        if (count($recent['hits']) == 0) {
            $this->isEmpty = true;
        }

        array_push($this->posts, ...$recent['hits']);

        $this->offset += 20;
    }

    public function loadMorePhoto()
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');
        $recent = $client->index('photo')->search('', ['offset' => $this->offsetPhoto, 'limit' => 21, 'attributesToRetrieve' => [
            'id',
            'title',
            'slug',
            'user_id',
            'user_name',
            'images',
            'created_at',
            'timestamp'
        ]])->getRaw();

        if (count($recent['hits']) == 0) {
            $this->isEmpty = true;
        }

        array_push($this->photos, ...$recent['hits']);

        $this->offset += 21;
    }

    public function render()
    {
        if($this->scaffold == "photo") return view('livewire.loadmore-photo');

        return view('livewire.loadmore');
    }
}
