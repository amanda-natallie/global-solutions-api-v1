<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mockery\Exception;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    /**
     * Busca todas as imagens do conteudo
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

        $imagem = DB::table('imagem_conteudo')
            ->where(array('pagina_id' => $dados['pagina']))
            ->paginate($dados['paginacao']);

        if (!empty($imagem)) {
            return response()->json($imagem);
        } else {
            return response()->json(array(
                'success' => false,
                'error' => 'Não foi possível carregar as imagens'
            ));
        }
    }

    /**
     * Cria a imagem para o conteudo
     *
     * @param Request $request
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

            $imagem_conteudo = array(
                'imagem' => $dados['imagem'],
                'pagina_id' => $dados['pagina_id'],
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            );

            $imagemId = DB::table('imagem_conteudo')->insert($imagem_conteudo);

            if (!empty($imagemId)) {
                return response()->json(array(
                    'success' => true,
                    'message' => 'Imagem criada com sucesso!',
                ));
            } else {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível criar a imagem!'
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
     * Atualiza a imagem do conteudo existente
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
            $dados['updated_at'] = date("Y-m-d H:i:s");

            $imagem_conteudo = DB::table('imagem_conteudo')->where(array('id' => $dados['id']))->update($dados);

            if (!empty($imagem_conteudo)) {
                return response()->json(array(
                    'success' => true,
                    'message' => 'Imagem atualizada com sucesso!',
                ));
            } else {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível atualizar a imagem!'
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
     * Remove a imagem
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Request $request)
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
            $dados['updated_at'] = date("Y-m-d H:i:s");
            $dados['ativo'] = 0;


            $imagem = DB::table('imagem_conteudo')->delete($dados);

            if (!empty($imagem)) {
                return response()->json(array(
                    'success' => true,
                    'message' => 'Imagem removida com sucesso!'
                ));
            } else {
                return response()->json(array(
                    'success' => false,
                    'message' => 'Não foi possível remover a página!'
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
