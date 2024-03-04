//import {elementosEtapa} from  '../data/tabelaEtapaFluxo.js';
//import {elementosFluxo} from  '../data/tabelaFluxo.js';

export function gerarHTML(elementos) {
    let html = '';

    elementos.forEach(elemento => {
        const { tag, id, classe, conteudo, filhos, outros } = elemento;
        let atributos = '';

        if (id) {
            atributos += ` id="${id}"`;
        }

        if (classe) {
            atributos += ` class="${classe}"`;
        }

        if (outros) {
            atributos += ` ${outros}`;
        }

        if (tag) {
            html += `<${tag}${atributos}>`;
        }

        if (conteudo) {
            html += conteudo;
        }

        if (filhos && filhos.length > 0) {
            html += gerarHTML(filhos);
        }

        if (tag) {
            html += `</${tag}>`;
        }
    });

    return html;
}