<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FluxoController extends Controller
{
    public function etapasFluxo($id){
        return view('etapasFluxo',['id'=>$id]);
    }
}
