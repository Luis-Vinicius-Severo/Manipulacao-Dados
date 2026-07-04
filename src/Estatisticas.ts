import CountBy from './CoutBy.js';

type TransacaoValor = Transacao & { valor: number };

function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  total;
  pagamento;
  status;
  semena;
  melhorDia;
  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semena = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }
  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }
  private setPagamento() {
    return CountBy(this.transacoes.map(({ pagamento }) => pagamento));
  }
  private setStatus() {
    return CountBy(this.transacoes.map(({ status }) => status));
  }

  private setSemana() {
    const semena = {
      ['Domingo']: 0,
      ['Segunda']: 0,
      ['Terça']: 0,
      ['Quarta']: 0,
      ['Quinta']: 0,
      ['Sexta']: 0,
      ['Sábado']: 0,
    };
    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();
      if (day === 0) semena['Domingo'] += 1;
      if (day === 1) semena['Segunda'] += 1;
      if (day === 2) semena['Terça'] += 1;
      if (day === 3) semena['Quarta'] += 1;
      if (day === 4) semena['Quinta'] += 1;
      if (day === 5) semena['Sexta'] += 1;
      if (day === 6) semena['Sábado'] += 1;
    }
    return semena;
  }

  private setMelhorDia() {
    return Object.entries(this.semena).sort((a, b) => {
      return b[1] - a[1];
    })[0];
  }
}
