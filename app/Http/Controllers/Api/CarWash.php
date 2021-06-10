<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarWash extends Controller
{
    public function find(Request $request)
    {
        $dados = $request->all();

        $verificaToken = $this->verificaToken($dados['token']);

        if (!$verificaToken['success']) {
            return response()->json(array(
                'success' => false,
                'message' => 'Sua licença expirou, por favor entre em contato com o administrador!'
            ));
        }

        $conteudo = DB::table('conteudo_pagina')
            ->where(array('pagina_id' => $dados['pagina'], 'ativo' => 1))
            ->paginate($dados['paginacao']);

        if (!empty($conteudo)) {
            return response()->json($conteudo);
        } else {
            return response()->json(array(
                'success' => false,
                'error' => 'Não foi possível carregar os conteúdos'
            ));
        }
    }
}
