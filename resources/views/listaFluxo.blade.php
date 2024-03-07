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
    <!-- bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
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
                <button onclick="inserirLinhaFluxo()">Novo Fluxo</button>
            </div>
        </div>
        <div class="content-grid" id="bodyHtml">           
        </div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.x/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script type="module">
        import { gerarHTML } from '{{asset("js/htmlConstruct/table.js")}}';
        import {elementosFluxo} from  '{{asset("js/data/tabelaFluxo.js")}}';
        const htmlGerado = gerarHTML(elementosFluxo);
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