// Banco de dados da calculadora
const CalcDB = {
  // Chave usada no localStorage
  key: 'calc_db',

  // Pega todos os dados
  getAll() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : {
      history: [],        // histórico de contas
      memory: 0,          // valor da tecla M+/M-
      theme: 'dark',      // config da calculadora
      lastResult: null    // último resultado
    };
  },

  // Salva tudo de volta
  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },

  // Adiciona conta no histórico
  addHistory(calc) {
    const db = this.getAll();
    db.history.unshift(calc); // adiciona no início
    if (db.history.length > 50) db.history.pop(); // limita a 50 itens
    db.lastResult = calc.result;
    this.save(db);
  },

  // Limpa histórico
  clearHistory() {
    const db = this.getAll();
    db.history = [];
    this.save(db);
  },

  // Salva valor na memória (M+/M-)
  saveMemory(value) {
    const db = this.getAll();
    db.memory = value;
    this.save(db);
  },

  // Limpa o valor da memória (MC)
  clearMemory() {
    const db = this.getAll();
    db.memory = 0;
    this.save(db);
  },

  // Altera e salva o tema (light/dark)
  setTheme(themeName) {
    const db = this.getAll();
    db.theme = themeName;
    this.save(db);
  },

  // Atualiza o último resultado calculado
  setLastResult(result) {
    const db = this.getAll();
    db.lastResult = result;
    this.save(db);
  }
};
