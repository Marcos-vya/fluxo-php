
// const tipoColunasEntradaDados = [
//     {id:1, title:'Numero', typeC:'int', min:1, max:3},
//     {id:2, title:'E-mail', typeC:'string', min:50, max:255},
//     {id:3, title:'Cep', typeC:'int', min:7, max:7},
//     {id:4, title:'Telefone', typeC:'int', min:11, max:14},
// ];

// function contagemElementosEtapa(){
//     const etapas = document.querySelectorAll(".elemento-etapa");
//     const total = etapas.length;
//     return total;
// }
    let linhaArrastada = null;
    linhas.forEach(linha => {
        linha.addEventListener('dragstart', () => {
            linhaArrastada = linha;
            setTimeout(() => {
                linha.style.display = 'none';
            }, 0);
        });

        linha.addEventListener('dragend', () => {
            linha.style.display = '';
            linhaArrastada = null;
            atualizarOrdem();
        });

        linha.addEventListener('dragover', e => {
            e.preventDefault();
            const posicao = obterPosicao(e.clientY);
            const proximaLinha = obterProximaLinha(tabela, posicao);
            if (proximaLinha !== linha && proximaLinha !== linha.nextSibling) {
                tabela.insertBefore(linha, proximaLinha);
            }
        });
    });
   
    function obterPosicao(y) {
        const linhas = Array.from(tabela.querySelectorAll('tr:not([draggable="false"])'));
        return linhas.reduce((resultado, linha) => {
            const retangulo = linha.getBoundingClientRect();
            const centro = retangulo.top + retangulo.height / 2;
            if (y > centro) {
                return { depois: linha };
            } else {
                return resultado.depois ? resultado : { antes: linha };
            }
        }, {});
    }

    function obterProximaLinha(tabela, posicao) {
        return posicao.depois ? posicao.depois.nextSibling : posicao.antes;
    }

function atualizarOrdem() {
    const ordemTds = tabela.querySelectorAll('.ordemNumero');
    ordemTds.forEach((td, index) => {
        td.textContent = index + 1;
    });
}

function gerardorCodigoUnico() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function inserirLinha() {
    const chaveElemento = gerardorCodigoUnico();
    Swal.fire({
        title: 'Adicionar Etapa Fluxo',
        allowOutsideClick: false,
        showCloseButton: true,
        html: `
            <div class="gridModal">
                <span>Nome da Etapa</span>
                <input id="swal-input1" class="swal2-input" placeholder="Insira o nome da etapa">
            </div>
            <div class="gridModal">
                <span>Descrição</span>
                <input id="swal-input2" class="swal2-input" placeholder="Descrição">
            </div>
            <div class="gridModal">
                <span>Evento</span>
                <input id="swal-input3" class="swal2-input" placeholder="Descrição">
            </div>
            <div id="swal-input4-container">
                <p>Condições</p>
                <div id="grupo-container-condicao"></div>
                <button onclick="crialinhaModal('condicao')"><i class="bi bi-plus-lg"></i> Adicionar condição</button>
            </div>
            <div id="swal-input5-container">
                <p>Ações</p>
                <div id="grupo-container-acao"></div>
                <button onclick="crialinhaModal('acao')"><i class="bi bi-plus-lg"></i> Adicionar ação</button>
            </div>
        `,
        focusConfirm: false,
        preConfirm: () => {            
            return {
                nomeDaEtapa: document.getElementById('swal-input1').value,
                descricao: document.getElementById('swal-input2').value,
                evento: document.getElementById('swal-input3').value,
                condicoes: obterCondicoes(),
                acoes: obterAcoes()
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            //ajax, chama função para o back
            const novaLinha = `
                <tr id="${chaveElemento}">
                    <td class="ordemNumero"></td>
                    <td>${result.value.nomeDaEtapa}</td>
                    <td>${result.value.descricao}</td>
                    <td>${result.value.evento}</td>
                    <td>${result.value.condicoes}</td>
                    <td> <button id="btAdd" onclick="removerLinha(this)">Deletar</button> <button id="btAdd">Editar</button></td>
                </tr>
            `;
            // Inserir a nova linha na tabela
            tabela.insertAdjacentHTML('beforeend', novaLinha);
            atualizarOrdem();
        }
    });
}

function removerLinha(botao) {
    const linha = botao.closest('tr');
    linha.remove();
    atualizarOrdem();
}

function obterCondicoes() {
    const condicoes = [];
    const condicaoDivs = document.querySelectorAll('#grupo-container-condicao > div');
    condicaoDivs.forEach(div => {
        const selectEvento = div.querySelector('.condicao-primeiro');
        const selectCondicao = div.querySelector('.condicao-segundo');
        const selectAcao = div.querySelector('.condicao-terceiro');

        const eventoSelecionado = selectEvento.value;
        const condicaoSelecionada = selectCondicao.value;
        const acaoSelecionada = selectAcao.value;

        condicoes.push({
            evento: eventoSelecionado,
            condicao: condicaoSelecionada,
            acao: acaoSelecionada
        });
    });
    return condicoes;
}

function obterAcoes() {
    const acoes = [];
    const divsAcao = document.querySelectorAll('#grupo-container-acao > div');

    divsAcao.forEach(div => {
        const selectEvento = div.querySelector('.acao-primeiro');
        const selectCondicao = div.querySelector('.acao-segundo');

        const eventoSelecionado = selectEvento.value;
        const condicaoSelecionada = selectCondicao.value;

        acoes.push({
            evento: eventoSelecionado,
            condicao: condicaoSelecionada,
        });
    });
}

function crialinhaModal(grupo){
    const elementoPai = document.getElementById(`grupo-container-${grupo}`);
    let novoElemento = `index_acao_${(gerardorCodigoUnico())}`;
    let html;
    if (grupo == 'condicao'){
        html = `
            <div id="${novoElemento}">
                <select id="swal-input3" class="condicao-primeiro">
                    <option value="">Selecione um evento</option>
                    <option value="evento1">Evento 1</option>
                    <option value="evento2">Evento 2</option>
                </select>
                <select class="condicao-segundo">
                    <option value="">Selecione</option>
                    <option value="condicao1">Condição 1</option>
                    <option value="condicao2">Condição 2</option>
                </select>
                <select class="condicao-terceiro">
                    <option value="">Selecione</option>
                    <option value="condicao3">Condição 3</option>
                    <option value="condicao4">Condição 4</option>
                </select>
                <button onclick="removelinhaModal('${novoElemento}')"><i class="bi bi-x"></i></button>
            </div>`
    } else if(grupo == 'acao'){
        html = `
        <div id="${novoElemento}">
            <select class="acao-primeiro">
                <option value="">Selecione</option>
                <option value="condicao1">Condição 1</option>
                <option value="condicao2">Condição 2</option>
            </select>
            <select class="acao-segundo">
                <option value="">Selecione</option>
                <option value="condicao3">Condição 3</option>
                <option value="condicao4">Condição 4</option>
            </select>
            <button onclick="removelinhaModal('${novoElemento}')"><i class="bi bi-x"></i></button>
        </div>`
    }
    //elementoPai.outerHTML  += html;
    elementoPai.insertAdjacentHTML('beforeend', html);
}

function removelinhaModal(idLinha){
    return document.getElementById(`${idLinha}`).remove();
}