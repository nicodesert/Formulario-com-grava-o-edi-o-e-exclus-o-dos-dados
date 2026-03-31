export class pessoa {
  constructor({ id = null, nome = '', email = '', senha = '', telefone = '', sexo = '', curso = '' } = {}) {
    this._id = id ?? pessoa.gerarId();
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.sexo = sexo;
    this.curso = curso;
  }

  get id() { return this._id; }

  get nome() { return this._nome; }
  set nome(v) { this._nome = (typeof v === 'string') ? v.trim() : v; }

  get email() { return this._email; }
  set email(v) { this._email = (typeof v === 'string') ? v.trim() : v; }

  get senha() { return this._senha; }
  set senha(v) { this._senha = v; }

  get telefone() { return this._telefone; }
  set telefone(v) { this._telefone = v; }

  get sexo() { return this._sexo; }
  set sexo(v) { this._sexo = v; }

  get curso() { return this._curso; }
  set curso(v) { this._curso = v; }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      sexo: this.sexo,
      curso: this.curso
    };
  }

  static fromPlain(obj = {}) {
    return new pessoa({
      id: obj.id,
      nome: obj.nome,
      email: obj.email,
      senha: obj.senha,
      telefone: obj.telefone,
      sexo: obj.sexo,
      curso: obj.curso
    });
  }

  static gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
}
