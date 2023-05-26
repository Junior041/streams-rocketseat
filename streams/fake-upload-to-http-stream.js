import {Readable} from 'node:stream';

class OneToHundredSream extends Readable {
    index = 1;
    _read() {
      const i = this.index++;
  
      setTimeout(() => {
        if (i > 5) {
          this.push(null);
        } else {
          const buff = Buffer.from(String(i));
          this.push(buff);
        }
      }, 1000);
    }
  }
  
  fetch('http://localhost:3334/users', {
    method: 'POST',
    body: new OneToHundredSream(),
    duplex: 'half' // adicionar essa opção
  }).then(response => {
    return response.text()
  }).then(data => {
    console.log(data)
  })