<?php

namespace App\Http\Livewire;

use Livewire\Component;
use MeiliSearch\Client;

class Loadmore extends Component
{
    public $posts = [];
    public $slug;
    public $scaffold;
    public $offset = 20;
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

    public function render()
    {
        return view('livewire.loadmore');
    }
}
