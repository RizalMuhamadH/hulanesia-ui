<?php

namespace App\Services;

use Analytics;
use Illuminate\Support\Facades\Cache;
use Spatie\Analytics\Period;

class Trending
{
    public function week($limit = 20)
    {
        $res = Cache::remember('trending_week', 1200, function () use ($limit) {
            $data = $this->getResults(7);

            return $data;
        });
        return $res;
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
