<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class CarController extends Controller
{
    
    /**
     * Busca todos carro cadastrados.
     *
     * @return JsonResponse
     */
    public static function findAll()
    {
        $conteudo = DB::table('car')->get();

        return response()->json([
            "success" => true,
            "records" =>  $conteudo
        ]);
    }
    

    /**
     * Insere um novo carro.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        try {
            $dados = $request->all();

            $conteudo = array(
                'foto' => $dados['foto'],
                'modelo' => $dados['modelo'],
                'ano' => $dados['ano'],
                'kmRodado' => $dados['kmRodado'],
                'placa' => $dados['placa'],
                'dono' => $dados['dono'],
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            );

            $carro = DB::table('car')->insert($conteudo);

            if (!empty($carro)) {
                return response()->json(array(
                    'success' => true,
                    'message' => 'Carro inserido com sucesso!',
                ));
            } else {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível inserir o carro!'
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
     * Atualiza o registro de um carro.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        try{
            $dados = $request->all();
            $dados['updated_at'] = date("Y-m-d H:i:s");

            $conteudo = DB::table('car')->where(array('id' => $dados['id']))->update($dados);

            if (!empty($conteudo)) {
                return response()->json(array(
                    'success' => true,
                    'message' => 'Carro atualizado com sucesso!',
                ));
            } else {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível atualizar o carro!'
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
     * Realiza o upload da imagem e converte em base64
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);


        if ($request->hasFile('file')) {
            $imageBase64 = 'data:image/' . strtolower($request->file('file')->getClientOriginalExtension()) . ';base64,' . base64_encode(file_get_contents($request->file('file')));

            return response()->json(array(
                'success' => true,
                'image' => $imageBase64
            ));
        }

        return response()->json(array(
            'success' => false
        ));

    }

    /**
     * Remove o carro.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Request $request)
    {
        try {
            $dados = $request->all();

            $conteudo = DB::table('car')->delete($dados['id']);

            if (!empty($conteudo)) {
                return response()->json(array(
                    'success' => true,
                    'message' => 'Carro removido com sucesso!'
                ));
            } else {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível remover o carro!'
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
     * Busca todos carro cadastrados.
     *
     * @return JsonResponse
     */
    public function findByid(Request $request)
    {
        $dados = $request->all();
        $conteudo = DB::table('car')->where("id", "=", $dados['id'])->get();

        return response()->json([
            "success" => true,
            "records" =>  $conteudo
        ]);
    }

}
