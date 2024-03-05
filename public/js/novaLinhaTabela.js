
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
                <textarea id="swal-input2" class="swal2-input"></textarea>
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
            <div>
                <input type="checkbox" value="true" id="checkFinish"><label for="checkFinish">Finaliza Fluxo ?</label>
            </div> 
        `,
        focusConfirm: false,
        preConfirm: () => {            
            return {
                EtapasFluxo : {
                    nomeDaEtapa: document.getElementById('swal-input1').value,
                    descricao: document.getElementById('swal-input2').value,
                    evento: document.getElementById('swal-input3').value,
                    finaliza: document.getElementById('checkFinish').value,
                    condicoes: obterCondicoes(),
                    acoes: obterAcoes()
                }
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
                <select id="swal-input3" onchange="atualizarOpcoesAcao()" class="condicao-primeiro">
                    <option value=" ">Selecione um evento</option>
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
            </div>`;            
    } else if(grupo == 'acao'){
        html = `
        <div id="${novoElemento}">
            <select class="acao-primeiro">
                
            </select>
            <select class="acao-segundo">
                <option value="">Selecione</option>
                <option value="condicao3">Condição 3</option>
                <option value="condicao4">Condição 4</option>
            </select>
            <button onclick="removelinhaModal('${novoElemento}')"><i class="bi bi-x"></i></button>
        </div>`;
    }
    //elementoPai.outerHTML  += html;
    elementoPai.insertAdjacentHTML('beforeend', html);
    atualizarOpcoesAcao();  
}

function removelinhaModal(idLinha){
    atualizarOpcoesAcao();
    document.getElementById(`${idLinha}`).remove();
}

function inserirLinhaFluxo(){
    Swal.fire({
        title: 'Adicionar Fluxo',
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
        `,
        focusConfirm: false,
        preConfirm: () => {            
            return {
                fluxo: {
                    nomeDoFluxo : document.getElementById('swal-input1').value,
                    descricao : document.getElementById('swal-input2').value,
                }
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            //chama função para o back
            var codeUnic = envioNovoFluxo();
            const novaLinha = `
                <tr id="">
                    <td>${result.value.nomeDoFluxo}</td>
                    <td>${result.value.descricao}</td>
                    <td> <button id="btAdd" onclick="removerLinha(this)">Deletar</button> <button id="btAdd">Editar</button> <button id="btAdd" onclick="janelaEtapas('${codeUnic}')">Etapas</button></td>
                </tr>
            `;
            // Inserir a nova linha na tabela
            tabela.insertAdjacentHTML('beforeend', novaLinha);
            // atualizarOrdem();
        }
    });
}

function envioNovoFluxo(){
    /*
        Gera no banco o Fluxo (insert)
        retorna o id unico, qual é usado para
        vincular as etapas
    */
    /*
        $.ajax({
            url: `Rota`,
            type: 'POST',
            success: function(data) {
                sweetSuccess();
                return data;
            },
            error: function(xhr, status, error) {            
                console.error('Erro ao carregar etapas do fluxo:', error);            
            }
        });
    */
    return gerardorCodigoUnico();
}

function janelaEtapas(id) {
    /*
        Acessa a pagina etapas do Fluxo, 
        faz uma query no banco pelo id do
        fluxo e retorna todos as etapas
    */

    // $.ajax({
    //     url: `/fluxo/${id}`,
    //     type: 'GET',
    //     success: function(data) {
    //         console.log('Informações do fluxo:', data);            
    //     },
    //     error: function(xhr, status, error) {            
    //         console.error('Erro ao carregar etapas do fluxo:', error);            
    //     }
    // });
    window.location.href = `/fluxo/${id}`;
}

function sweetSuccess(){
    Swal.fire({
        icon: "success",
        title: "Salvo com Sucesso !",
        showConfirmButton: false,
        timer: 1500
      });
}

function montaModal(id){
    /*
        $.ajax({
            url: `Rota`,
            type: 'POST',
            data : `${id}`
            success: function(data) {
                sweetSuccess();
                return data;
            },
            error: function(xhr, status, error) {            
                console.error('Erro ao carregar etapas do fluxo:', error);            
            }
        });
    */
}

function atualizarOpcoesAcao() {
    const acaoSelects = document.querySelectorAll('.acao-primeiro');
    const condicaoSelects = document.querySelectorAll('.condicao-primeiro');
    acaoSelects.forEach(acaoSelect => {
        zerarSelect(acaoSelect);
        condicaoSelects.forEach(condicaoSelect => {
            const valorCondicao = condicaoSelect.value;
            const textoCondicao = condicaoSelect.options[condicaoSelect.selectedIndex].text;            
            if (valorCondicao) {
                const novaOpcao = document.createElement('option');
                novaOpcao.value = valorCondicao;
                novaOpcao.textContent = textoCondicao;
                acaoSelect.appendChild(novaOpcao);
            }
        });
    });
}

function zerarSelect(elementoSelect) {
    elementoSelect.innerHTML = '';
}