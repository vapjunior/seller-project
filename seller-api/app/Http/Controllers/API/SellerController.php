<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SellerCollection;
use App\Http\Resources\SellerResource;
use Illuminate\Support\Facades\DB;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sellers = DB::table('sellers')
                        ->select('sellers.id','sellers.name','sellers.email',DB::raw('IFNULL(ROUND(SUM(sales.value * sales.`percentage_commission`/100),2),0) AS commission'))
                        ->leftJoin('sales','sellers.id','=','sales.seller_id')
                        ->groupBy('sellers.id')
                        ->get();

        $code = 200;
        $response['success'] = true;
        $response['data'] = $sellers;
        $response['message'] = 'Vendedores recuperados com sucesso';

        return response()->json($response);

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
            'name' => 'required',
            'email' => 'required|email|unique:sellers',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao criar vendedor';
            return response()->json($response, $code);
        }

        $seller = Seller::create($data);

        $code = 201;
        $response['success'] = true;
        $response['data'] = new SellerResource($seller);
        $response['message'] = 'Vendedor criado com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Seller  $seller
     * @return \Illuminate\Http\Response
     */
    public function show(Seller $seller)
    {
        $code = 200;
        $response['success'] = true;
        $response['data'] = new SellerResource($seller);
        $response['message'] = 'Vendedor recuperado com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Seller  $seller
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Seller $seller)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => 'required|email|unique:sellers',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao atualizar vendedor';

            return response()->json($response, $code);
        }

        $seller->update($data);

        $code = 204;

        return response()->json(null, $code);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Seller  $seller
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seller $seller)
    {
        $seller->delete();
        
        $code = 204;

        return response()->json(null, $code);
    }
}
