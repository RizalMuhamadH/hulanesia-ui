<?php

namespace App\Services;

use Analytics;
use Spatie\Analytics\Period;

class Trending
{
    public function week($limit = 20)
    {
        return $this->getResults(7);
    }
    protected function getResults($days, $limit = 20)
    {
        $data = Analytics::fetchMostVisitedPages(Period::days($days), $limit);
        return $this->parseResults($data, $limit);
    }

    protected function parseResults($data, $limit)
{
    return $data->reject(function($item){
        return $item['url'] == '/' or
        $item['url'] == '/tag' or
        $item['url'] == '/page' or
        $item['url'] == '/category' or
        str_starts_with($item['url'], '/category') or
        str_starts_with($item['url'], '/tag') or
        str_starts_with($item['url'], '/page');
    })->unique('url')->transform(function($item){
        $item['pageTitle'] = str_replace(' - Laravel News', '', $item['pageTitle']);
        return $item;
    })->splice(0, $limit);
}
}
