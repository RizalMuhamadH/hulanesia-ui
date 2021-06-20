<?php

namespace App\Models;

use App\Traits\Resizable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    use Resizable;

    protected $fillable = [
        'path',
        'caption'
    ];

    protected $guarded = [];

    public function imageable()
    {
        return $this->morphTo();
    }
}
