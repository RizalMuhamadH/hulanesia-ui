<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'title'             => $this->title,
            'slug'              => $this->slug,
            'description'       => $this->description,
            'category'          => [
                'name'          => $this->category->name,
                'slug'          => $this->category->slug
            ],
            'image'             => new ImageResource($this->image),
            'user'              => $this->user->name,
            'create_at'         => $this->create_at,
        ];
    }
}
