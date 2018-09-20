
const faixas = Array();
const aliquotas = Array();

faixas[0] = 22847.76;
faixas[1] = 11072.04;
faixas[2] = 11092.80;
faixas[3] = 10963.56;


aliquotas[1] = 7.5;
aliquotas[2] = 15;
aliquotas[3] = 22.5;
aliquotas[4] = 27.5;

MAXIMO_POR_DEPENDENTE = 2275.08;
MAXIMO_INSTRUCAO = 3561.50;
 

function nImpostoTotalDevido(nRendimento, dependentes, deducao_escola, outras_deducoes) {
 
  nImpostoTotal = 0;
  nRestante = nBaseCalculo(nRendimento, dependentes, deducao_escola, outras_deducoes) - faixas[0];
  if (nRestante <= 0) {
    nImpostoTotal = 0;
  } else {
    nRestanteA = nRestante - faixas[1];

    if (nRestanteA <= 0) {
      nImpostoTotal = nRestante * aliquotas[1] / 100;
    } else {
      nImpostoTotal += faixas[1] * aliquotas[1] /100;

      nRestanteB = nRestanteA - faixas[2];

      if (nRestanteB <= 0) {
        nImpostoTotal += nRestanteA * aliquotas[2] / 100;
      } else {

        nRestanteC = nRestanteB - faixas[3];
        nImpostoTotal += faixas[2] * aliquotas[2] / 100;
        if (nRestanteC <= 0) {
          nImpostoTotal += nRestanteB * aliquotas[3] / 100;
        } else {

          nRestanteD = nRestanteC;
          nImpostoTotal += faixas[3] * aliquotas[3] / 100;

          if( nRestanteD <=0) {
            nImpostoTotal +=  nRestanteC * aliquotas[4] / 100;
          } else {

            nImpostoTotal += nRestanteD * aliquotas[4] / 100;
          }
        }
      }
    }
  }

  return nImpostoTotal;

}

function nDeducaoDependente(dependentes) {

  return parseFloat(dependentes) * MAXIMO_POR_DEPENDENTE;

}

function nDeducaoEscola(deducao, dependentes) {
  return (parseFloat(deducao) > ((dependentes + 1) * MAXIMO_INSTRUCAO)) ? ((parseFloat(dependentes) + 1) * MAXIMO_INSTRUCAO) : parseFloat(deducao);

}


function nTotalDeducoes(dependentes, deducao_escola, outras_deducoes) {
  return nDeducaoDependente(parseFloat(dependentes)) + nDeducaoEscola(parseFloat(deducao_escola), parseFloat(dependentes)) + parseFloat(outras_deducoes);
}


function nBaseCalculo(nRendimento, dependentes, deducao_escola, outras_deducoes) {
  nBase = nRendimento - nTotalDeducoes(dependentes, deducao_escola, outras_deducoes);
  return (nBase > 0) ? nBase : 0;
}

function nLimiteMaximo(nRendimento, dependentes, deducao_escola, outras_deducoes) {
  return nImpostoTotalDevido(nRendimento, dependentes, deducao_escola, outras_deducoes) * 6 / 100;
}

function calcular(nRendimento, dependentes, deducao_escola, outras_deducoes) {
  document.getElementById('base_calculo').innerHTML = nBaseCalculo(nRendimento, dependentes, deducao_escola, outras_deducoes);
  document.getElementById('imposto_devido').innerHTML = nImpostoTotalDevido(nRendimento, dependentes, deducao_escola, parseFloat(outras_deducoes));
  document.getElementById('limite_maximo').innerHTML = nLimiteMaximo(nRendimento, dependentes, deducao_escola, parseFloat(outras_deducoes));
  document.getElementById('total_deducoes').innerHTML = nTotalDeducoes(dependentes, parseFloat(deducao_escola), parseFloat(outras_deducoes));
}

