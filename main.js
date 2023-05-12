const prompt = require('prompt-sync')();

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (field) {
    
    this.field = field;
    this.newField = this.field.map(row => [...row]);
    this.numColumns = this.field[0].length;
    this.initIndex = [].concat.apply([], ([].concat.apply([], this.field))).indexOf(pathCharacter);
    this.row = parseInt(this.initIndex / this.numColumns);
    this.col = this.initIndex % this.numColumns;

  }
  
  static generateField () {
    let field = [];
    const rows = Math.floor(Math.random() * 6 + 5);
    const cols = Math.floor(Math.random() * 5 + 4);
    for (let i=0; i<rows; i++ ) {
      const tempRow = [];
      for (let i=0; i<cols; i++) {
        tempRow.push(fieldCharacter);
      }
      field.push(tempRow);
    }
    field[0][0] = pathCharacter;
    
    const hatCol = Math.floor(Math.random() * (cols - 1) + 1);
    const hatRow = Math.floor(Math.random() * (rows - 1) + 1);
    field[hatRow][hatCol] = hat;
    const perc = Math.random() * 0.3 + 0.2;
    
    const max = Math.floor(perc * (rows * cols));
    for (let i=1; i<max; i++) {
      const holeIndex = Math.floor(Math.random() * ((rows*cols) - 1));
      const holeRow = parseInt(holeIndex / cols);
      const holeCol = holeIndex % cols;
      if (field[holeRow][holeCol] === fieldCharacter) {
        field[holeRow][holeCol] = hole;
        }
    }
        return field;
  }
  setup () {
    this.name = prompt('Enter your Name: ')
    console.log(`Welcome ${this.name}`);
    this.play(this.field);
    
  }
  makeMove (direction) {
    switch (direction) {
      case 'A':
        this.col = this.col - 1;
        break;
      case 'D':
        this.col = this.col + 1;
        break;
      case 'W':
        this.row = this.row - 1;
        break;
      case 'S':
        this.row = this.row + 1;
        break;
      default:
       console.log('Press W,A,S or D');
       
                
    }

     if (this.col >=0  && this.col < this.numColumns && this.row >=0 && this.row < this.field.length  && this.field[this.row][this.col] !== hole) {
       if (this.field[this.row][this.col] === hat) { 
         this.win()
         } else {
         
         
         this.newField[this.row][this.col] = pathCharacter;
         
      
      this.play(this.newField);}
     } else {
       this.lose();
     }
    
  }

  play (field) {
    this.print(field);
    const direction = prompt('Next Move (W for up, S for down, A for left, D for right): ').toUpperCase();
   
    if (direction){
      this.makeMove(direction)
      };
  
  }

  playAgain () {
  this.field = Field.generateField();
  this.newField = this.field.map(row => [...row]);
  this.row = parseInt(this.initIndex / this.numColumns);
  this.col = this.initIndex % this.numColumns;
  let response = prompt ('Play Another Round? Y/N :').toUpperCase();
  switch (response) {
    case 'Y': 
      this.play(this.field);
      break;
    case 'N': 
      console.log('Goodbye')
      break;
    default:
      console.log('Invalid choice');
      this.playAgain();
  }
}

  lose () {
    console.log('You Lose!');
    this.playAgain();
  }

  win () {
    console.log('You Win!');
    this.playAgain();
  }

  

  print (field) {
    for (let row of field)
    console.log(row.join(' '))
  }
}


const myField = new Field(Field.generateField());

myField.setup();

