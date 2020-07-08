<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'id',
        'value',
        'seller_id',
        'date',
        'percentage_commission',
    ];
    
    public function seller()
    {
        return $this->belongsTo('App\Seller', 'seller_id');
    }
}
