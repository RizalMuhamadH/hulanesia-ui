<?php

namespace App\Http\Livewire;

use Google\Service\Books\Offers;
use Livewire\Component;
use MeiliSearch\Client;

class LoadmoreCategory extends Component
{
    public $posts = [];
    public $loading = false;
    public $category;
    protected $offset = 4;


    public function mount()
    {
    }

    public function loadMore()
    {
        $this->loading = true;
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');
        $recent = $client->index('post')->search('', ['offset' => $this->offset,'limit' => 20, 'filters' => 'status = PUBLISH AND category_slug = '.$this->category, 'attributesToRetrieve' => [
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

        array_push($this->posts, ...$recent);

        $this->offset += 20;
        $this->loading = true;

    }

    public function render()
    {
        return view('livewire.loadmore-category');
    }
}
