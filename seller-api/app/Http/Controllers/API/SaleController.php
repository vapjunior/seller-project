<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Sale;
use App\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SaleResource;
use Carbon\Carbon;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Seller $seller)
    {
        $sales = $seller->sales;

        $code = 200;
        $response['success'] = true;
        $response['data'] = SaleResource::collection($sales);
        $response['message'] = 'Vendas recuperadas com sucesso';
        
        return response()->json($response, $code);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'seller_id' => 'required',
            'value' => 'required',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao lançar venda';
            return response()->json($response, $code);
        }

        $data['percentage_commission'] = 8.5;
        // $data['commission'] = round($data['value'] * ($data['percentage_commission']/100),2);
        $data['date'] = Carbon::now()->format('Y-m-d');

        $sale = Sale::create($data);

        $code = 201;
        $response['success'] = true;
        $response['data'] = new SaleResource($sale);
        $response['message'] = 'Venda lançada com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Sale $sale)
    {
        $code = 200;
        $response['success'] = true;
        $response['data'] = new SaleResource($seller);
        $response['message'] = 'Vendedor recuperado com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();
        
        $code = 204;

        return response()->json(null, $code);
    }
}
