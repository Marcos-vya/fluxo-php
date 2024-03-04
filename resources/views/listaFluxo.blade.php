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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/gh/jerosoler/Drawflow/dist/drawflow.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
</head>
<body style="background: black; color: white; padding: 10px;">
    <header>
        <h2>Form Fluxo</h2>
    </header>
    <section>
        <div class="content">
            <div class="">
                <button onclick="inserirLinha()">Novo Fluxo</button>
            </div>
        </div>
        <div class="content-grid" id="bodyHtml">
            
           
        </div>
    </section>
<script type="module" src="{{asset('js/data/tabelaFluxo.js')}}"></script>
<script type="module"  src="{{asset('js/htmlConstruct/table.js')}}"></script>
<script type="module">
    import { gerarHTML } from '{{asset("js/htmlConstruct/table.js")}}';
    import {elementosFluxo} from  '{{asset("js/data/tabelaFluxo.js")}}';

    document.addEventListener('DOMContentLoaded', (event) => {        
        const htmlGerado = gerarHTML(elementosFluxo);
        console.log(htmlGerado);
        document.getElementById('bodyHtml').innerHTML = htmlGerado;
    });
    setTimeout(() => {
        var script = document.createElement('script');
        script.type = 'module';
        script.src = "{{asset('js/novaLinhaTabela.js')}}";
        document.head.appendChild(script);
    }, 500);
</script>
</body>
</html>