

const FALL = 'Fall ';
const SPRING = 'Spring ';
const SUMMER = 'Summer ';

let Alumnis = [];
export default Alumnis;

class Alumni {
  constructor(config) {
    Object.assign(this, {
      name: 'NULL',
      picture: false,
      body: '',
      graduate: false,
    })
    Object.assign(this, config);
    Alumnis.push(this);
  }

  export() {
    this.image = (this.picture || (this.github ? `https://github.com/${this.github}.png` : false));
    return this;
  }
}


const Elizabeth = new Alumni({
  name: "Elizabeth",
  graduate: FALL + 2020,
  github: 'Elizabeth1998',
})

console.log(Elizabeth)
