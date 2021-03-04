

const FALL = 'Fall ';
const SPRING = 'Spring ';
const SUMMER = 'Summer ';

let Alumnis = [];
export default Alumnis;

export let ShowCurrent = true;

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
  body: `<p>President</p><p>Sponsorship</p>`
})

const Seitz = new Alumni({
  name: "Chris Seitz",
  graduate: FALL + 2023,
  github: 'cseitz',
  body: `<p>Developer</p><p>bruh</p>`
})

const AlexPritt = new Alumni({ // UPDATED
  name: "Alex Pritt",
  graduate: FALL + 2020,
  github: 'alexpritt',
  body: `<p>Developer</p>`
})

const BenHollan = new Alumni({
  name: "Ben Hollan",
  graduate: FALL + 1990,
  github: 'bhollan5',
  body: ``
})

const KaitlinCochran = new Alumni({ // UPDATED
  name: "Katie Cochran",
  graduate: SPRING + 2023,
  github: 'bmvcbr',
  body: `<p>Sponsorship</p>`
})

const SamBruner = new Alumni({
  name: "Sam Bruner",
  graduate: FALL + 1990,
  github: 'BrunerSam',
  body: ``
})

const BWarring24 = new Alumni({
  name: "bwarring24",
  graduate: FALL + 1990,
  github: 'bwarring24',
  body: ``
})

const CamdemFullmer = new Alumni({
  name: "Camden Fullmer",
  graduate: FALL + 1990,
  github: 'camdenfullmer',
  body: ``
})

const ChanCrystal = new Alumni({
  name: "chancrystal",
  graduate: FALL + 1990,
  github: 'chancrystal',
  body: ``
})

const DanielGur = new Alumni({
  name: "Daniel Gur",
  graduate: FALL + 1990,
  github: 'danielgur',
  body: ``
})

const DavidSteinberg = new Alumni({
  name: "David Steinberg",
  graduate: FALL + 1990,
  github: 'davidsteinberg',
  body: ``
})

const ElliotFrankhouse = new Alumni({
  name: "Elliot Frankhouse",
  graduate: FALL + 1990,
  github: 'EFrankhouse',
  body: ``
})

const dkelsey3 = new Alumni({
  name: "dkelsey3",
  graduate: FALL + 1990,
  github: 'dkelsey3',
  body: ``
})

const GabeAbdullah = new Alumni({
  name: "Gabe Abdullah",
  graduate: FALL + 1990,
  github: 'gabdullah',
  body: ``
})

const IsaacPark = new Alumni({
  name: "Isaac Park",
  graduate: FALL + 1990,
  github: 'IAPark',
  body: ``
})

const IsaacBedard = new Alumni({
  name: "Isaac Bedard",
  graduate: FALL + 1990,
  github: 'ibedard16',
  body: ``
})

const JakeTobin = new Alumni({
  name: "Jake Tobin",
  graduate: FALL + 1990,
  github: 'JakeTobin',
  body: ``
})

const JTRaber = new Alumni({
  name: "JT Raber",
  graduate: FALL + 2023,
  github: 'JMANN240',
  body: ``
})

const JoshuaBehler = new Alumni({ // UPDATED
  name: "Joshua Behler",
  graduate: SPRING + 2022,
  github: 'Joshua2000B',
  body: `<p>Sponsorship</p><p>Developer</p>`
})

const KristyConry = new Alumni({
  name: "Kristi Conry",
  graduate: FALL + 2020,
  github: 'ktakattack',
  body: ``
})

const MackenzieKinzel = new Alumni({
  name: "Mackenzie Kinzel",
  graduate: FALL + 1990,
  github: 'mackenziekinzel',
  body: ``
})

const MikeZrimsek = new Alumni({
  name: "Mike Zrimsek",
  graduate: FALL + 1990,
  github: 'mzrimsek',
  body: ``
})

const TrentanTrahan = new Alumni({
  name: "Trentan Trahan",
  graduate: SPRING + 2022,
  github: 'Natnert',
  body: `<p>President</p><p>Sponsorship</p>`
})

const NicholasCrawford = new Alumni({
  name: "Nick Crawford",
  graduate: FALL + 1990,
  github: 'NickCrawford',
  body: ``
})

const nletdara = new Alumni({
  name: "nletdara",
  graduate: FALL + 1990,
  github: 'nletdara',
  body: ``
})

const NicLinscott = new Alumni({
  name: "Nic Linscott",
  graduate: FALL + 1990,
  github: 'nlinscott',
  body: ``
})

const PaulDilyard = new Alumni({
  name: "Paul Dilyard",
  graduate: FALL + 1990,
  github: 'pdilyard',
  body: ``
})

const PJLeyden = new Alumni({
  name: "P.J. Leyden",
  graduate: SPRING + 2019,
  github: 'PJ-Leyden',
  body: ``
})

const SamiGlass = new Alumni({
  name: "Sami Glass",
  graduate: FALL + 1990,
  github: 'sammyanthag',
  body: ``
})

const TylerYanke = new Alumni({
  name: "Tyler Yanke",
  graduate: FALL + 1990,
  github: 'TylerYanke',
  body: ``
})

const UnitedstatesOfAsia = new Alumni({
  name: "UnitedstatesofAsia",
  graduate: FALL + 1990,
  github: 'UnitedstatesofAsia',
  body: ``
})

const ValaZeinali = new Alumni({
  name: "Vala Zeinali",
  graduate: FALL + 1990,
  github: 'valazeinali',
  body: ``
})

const VereMiller = new Alumni({
  name: "Vere Miller",
  graduate: FALL + 2021,
  github: 'Vere Miller',
  body: `<p>Developer</p>`
})

const WesDelp = new Alumni({
  name: "Wes Delp",
  graduate: FALL + 1990,
  github: 'wesdelp',
  body: ``
})

const GabrielWeston = new Alumni({
  name: "Gabe Weston",
  graduate: SPRING + 2022,
  github: 'westriel',
  body: ``
})

const CollinWerner = new Alumni({ // UPDATED
  name: "Collin Werner",
  graduate: SPRING + 2020,
  github: 'collinw9898',
  body: `<p>Developer</p><p>Lesson Master</p><p>Legendary Shitposter</p>`
})
