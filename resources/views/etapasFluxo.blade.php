<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- # Last -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jerosoler/Drawflow/dist/drawflow.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://cdn.jsdelivr.net/gh/jerosoler/Drawflow/dist/drawflow.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body style="background: black; color: white; padding: 10px;">
    <header>
        <h2>Form Fluxo</h2>
    </header>
    <section>
        <div class="content">
            <div class="">
                <button onclick="inserirLinha()">Inserir Linha</button>
                <button id="btAdd">Salvar Fluxo</button>
            </div>
        </div>
        <div class="content-grid" id="bodyHtml">
            <!-- <table>
                <thead>
                    <tr>
                        <td>
                            <div>
                                <span>Etapa</span>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>Pergunta</span>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>Formato da Resposta</span>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>Destino/etapa</span>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>Ação</span>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody id="tabelaEtapas">
                    <tr draggable="true">
                        <td class="ordemNumero">
                            1
                        </td>
                        <td>
                            <input type="text">
                        </td>
                        <td>
                            <select name="" id="">
                                <option value=""></option>
                            </select>                        
                        </td>
                        <td>
                            <div>
                                <input type="text">
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>1</span>
                            </div>
                        </td>
                    </tr>
                    <tr draggable="true">
                        <td class="ordemNumero">
                            2
                        </td>
                        <td>
                            <div>
                                <input type="text">
                            </div>
                        </td>
                        <td>
                            <div>
                                <select name="" id="">
                                    <option value=""></option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="text">
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>1</span>
                            </div>
                        </td>
                    </tr>
                    <tr draggable="true">
                        <td class="ordemNumero">
                            3
                        </td>
                        <td>
                            <div>
                                <span>123</span>
                            </div>
                        </td>
                        <td>
                            <div>
                                <select name="" id="">
                                    <option value=""></option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="text">
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>1</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> -->  
        </div>
    </section>
<script type="module"  src="{{asset('js/htmlConstruct/table.js')}}"></script>
<script type="module">
    import { gerarHTML } from '{{asset("js/htmlConstruct/table.js")}}';
    import {elementosEtapa} from  '{{asset("js/data/tabelaEtapaFluxo.js")}}';      
    const htmlGerado = gerarHTML(elementosEtapa);
    document.getElementById('bodyHtml').innerHTML = htmlGerado;
</script>
<script>
    setTimeout(() => {
        window.tabela = document.getElementById('tabelaEtapas');
        window.linhas = tabela.querySelectorAll('tr');
        
        var script = document.createElement('script');
        script.src = "{{asset('js/novaLinhaTabela.js')}}";
        document.head.appendChild(script);
    }, 500);

</script>
</body>
</html>