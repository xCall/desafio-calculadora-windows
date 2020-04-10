class CalcController {

  //metodo construtor iniciado assim que a
  //aplicação é inicada, responsavel por construir os métodos
  //que devem iniciar junto da classe
  constructor() {

    //metodo que busca o display da calculadora
    //_displayCalcEl == elemento do display da calculadora
    this._displayCalcEl = document.querySelector('#display')

    //metodo responsavel buscar as teclas apertadas e associalas
    //a logicas que ja existem
    this.initKeyboard()

    //metodo responsavel por ler as teclas e os eventos que nelas ocorrem
    this.initButtonsEvents()

  }

  //metodos responsaveis pelo display da calculadora
  //o metodo get é responsavel por retornar os valores
  //validados no metodo set
  get displayCalc() {

    //retorna o valor e escreve no display
    return this._displayCalcEl.innerHTML
  }

  //metodo set é responsavel por receber e alterar os valores
  //da classe de maneira protegida, por tanto nao tem retorno
  set displayCalc(value) {

    //esse if é responsavel por validar a quantidade maxima de 
    //caracteres que devem aparecer na tela
    if (value.toString().length > 10) {
      this.setError()
      return false
    }

    //aqui o valor é recebido atraves do metodo
    this._displayCalcEl.innerHTML = value
  }

  //metodo responsavel por fazer o encadeamento dos valores da tela
  //com os valores para executar a logica
  execBtn(value) {

    switch (value) {
      case 'c':
        this.clearAll()
        break
      case 'ce':
        this.clearEntry()
        break
      case 'soma':
        this.addOperation('+')
        break
      case 'subtracao':
        this.addOperation('-')
        break
      case 'multiplicacao':
        this.addOperation('*')
        break
      case 'divisao':
        this.addOperation('/')
        break
      case 'porcento':
        this.addOperation('%')
        break
      case 'igual':
        this.calc()
        break
      case 'ponto':
        this.addDot('.')
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value))
        break
      default:
        this.setError()
        break
    }

  }

  //metodos para fazer a leitura do teclado
  initKeyboard() {

    //responsavel por ler a dom e toda vez que o evento keyup
    //é disparado ele chama uma callback que de acordo com o caso 
    //assosia a tecla a um valor na logica interna
    document.addEventListener('keyup', e => {

      switch (e.key) {
        case 'Escape':
          this.clearAll()
          break
        case 'Backspace':
          this.clearEntry()
          break
        case '+':
        case '-':
        case '/':
        case '*':
        case '%':
          this.addOperation(e.key)
          break
        case 'Enter':
        case '=':
          this.calc()
          break
        case '.':
        case ',':
          this.addDot()
          break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.addOperation(parseInt(e.key))
          break
        case 'c':
          if (e.ctrlKey) this.copyToClipboard()
          break
      }
      console.log(e.key)
    })

  }

  //esse metodo pega um valor passado como parametros e faz diversas validacoes
  //e mostra na tela os valores que sao adicionas apos serem validados
  addOperation(value) {

    //esse laço verifica se o valor passado no isNaN e um numero ou nao
    if(isNaN(this.getLastOperation())) {
      
      //valida se o valor passado e um operador ou nao
      if(this.isOperator(value)) {

        //se nao for um operador entao o metodo guarda como ultimo valor da operacao
        this.setLastOperation(value)

      } else {
        
      }

    }
  }

  //metodo que faz a leitura dos botoes na tela atraves
  //do mouse e tambem por adicionar o texto escrito nos botoes
  initButtonsEvents() {

    //variavel local que guarda os buttons
    let buttons = document.querySelectorAll('#buttons > section')

    //laço que percorre os buttons e associa os valores presentes neles
    //juntamente com eventos
    buttons.forEach((btn, index) => {

      //cada vez que o botao sofre um evento click drag ele inicia uma arrow funcion
      this.addEventListenerAll(btn, 'click drag', e => {

        //variavel que substitui o nome da classe da para apenas btn
        let textBtn = btn.className.baseVal.replace('btn-', '')
        
        //metodo chamado para adicionar o valor dos buttons ao ser executado 
        //passando o valor textBtn para ser validado
        this.execBtn(textBtn)
      })
      this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
        btn.style.cursor = "pointer"
      })
    })
  }
}
