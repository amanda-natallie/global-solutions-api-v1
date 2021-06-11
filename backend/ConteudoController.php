<?php

namespace App\Http\Controllers\Api;

use Faker\Provider\DateTime;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mockery\Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ConteudoController extends Controller
{
    /**
     * Busca todos os conteudos por página
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Cria o conteudo para a pagina
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        try {
            $dados = $request->all();

            $verificaToken = $this->verificaToken($dados['token']);

            if (!$verificaToken['success']) {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Sua licença expirou, por favor entre em contato com o administrador!'
                ));
            }

            $conteudo_pagina = array(
                'titulo' => $dados['titulo'],
                'conteudo' => $dados['conteudo'],
                'pagina_id' => $dados['pagina'],
                'ativo' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            );

            $paginaId = DB::table('conteudo_pagina')->insert($conteudo_pagina);

            if (!empty($paginaId)) {
                return response()->json(array(
                    'success' => true,
                    'message' => 'Conteúdo criado com sucesso!',
                ));
            } else {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível criar o conteudo!'
                ));
            }

        } catch (Exception $e) {
            return response()->json(array(
                'success' => false,
                'message' => 'Houve uma falha, favor entrar em contato com o administrador',
                'exception' => $e
            ));
        }


    }

    /**
     * Atualiza nome da página existente
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        try {
            $dados = $request->all();
            $verificaToken = $this->verificaToken($dados['token']);

            if (!$verificaToken['success']) {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Sua licença expirou, por favor entre em contato com o administrador!'
                ));
            }
            unset($dados['token']);
            $dados['pagina_id'] = $dados['pagina'];
            unset($dados['pagina']);
            $dados['updated_at'] = date("Y-m-d H:i:s");

            $conteudo_pagina = DB::table('conteudo_pagina')->where(array('id' => $dados['id']))->update($dados);

            if(!empty($conteudo_pagina)){
                return response()->json(array(
                    'success' => true,
                    'message' => 'Conteúdo atualizado com sucesso!',
                ));
            }
            else{
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível atualizar o conteúdo!'
                ));
            }


        } catch (Exception $e) {
            return response()->json(array(
                'success' => false,
                'message' => 'Houve uma falha, favor entrar em contato com o administrador',
                'exception' => $e
            ));
        }
    }

    /**
     * Remove a página do site
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Request $request)
    {
        try{
            $dados = $request->all();

            $verificaToken = $this->verificaToken($dados['token']);

            if (!$verificaToken['success']) {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Sua licença expirou, por favor entre em contato com o administrador!'
                ));
            }

            unset($dados['token']);
            $dados['updated_at'] = date("Y-m-d H:i:s");
            $dados['ativo'] = 0;


            $pagina = DB::table('conteudo_pagina')->where(array('id' => $dados['id']))->update($dados);

            if(!empty($pagina)){
                return response()->json(array(
                    'success' => true,
                    'message' => 'Página removida com sucesso!'
                ));
            }
            else{
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível remover a página!'
                ));
            }

        }catch (Exception $e){
            return response()->json(array(
                'success' => false,
                'message' => 'Houve uma falha, favor entrar em contato com o administrador',
                'exception' => $e
            ));
        }
    }

    protected function verificaToken($token)
    {
        $hoje = date("Y-m-d H:i:s");

        $token = DB::table('token')->where([['validade', '>=', $hoje], ['token', '=', $token]])->value('token');

        if (!empty($token)) {
            return array('success' => true, 'token' => $token);
        } else {
            return array('success' => false);
        }
    }
}
