<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->seller->name,
            'email' => $this->seller->email,
            'commission' => round($this->value * ($this->percentage_commission/100),2),
            'value' => $this->value,
            'date' => $this->date,
        ];
    }
}
