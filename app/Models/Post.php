<?php

namespace App\Models;

use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Post extends Model implements Viewable
{
    use HasFactory;
    use InteractsWithViews;
    use Searchable;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'body',
        'source',
        'source_link',
        'feature_id',
        'category_id',
        'user_id',
        'status',
        'meta_description',
        'meta_keywords',
        'seo_title',
        'published_at'
    ];

    protected $dates = ['published_at'];
    
    protected $guarded = [];

    const SEARCHABLE_FIELDS = ['id', 'title', 'description'];

    public function shouldBeSearchable()
    {
        return $this->status === 'PUBLISH';
    }

    public function toSearchableArray()
    {
        return $this->only(self::SEARCHABLE_FIELDS);
    }

    public function scopePublish($query)
    {
        return $query->where('status', 'PUBLISH')->orderBy('created_at', 'DESC');
    }

    // public function publish()
    // {
    //     return $this->where('status', 'PUBLISH')->orderBy('created_at', 'DESC');
    // }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function feature()
    {
        return $this->belongsTo(Feature::class);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function video()
    {
        return $this->morphOne(Video::class, 'videoable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')->withTimestamps();
    }

    public function bodylinks()
    {
        return $this->morphMany(Bodylink::class, 'bodylinkable');
    }
}
