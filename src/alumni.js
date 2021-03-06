

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
  graduate: SPRING + 2020,
  github: 'BrunerSam',
  body: `<p>Developer</p><p>Food Coordinator</p>`
})

const BWarring24 = new Alumni({
  name: "bwarring24",
  graduate: FALL + 1990,
  github: 'bwarring24',
  body: ``
})

const CamdemFullmer = new Alumni({ // UPDATED
  name: "Camden Fullmer",
  graduate: SPRING + 2014,
  github: 'camdenfullmer',
  body: `<p>HacKSU Founder</p>`
})

const ChanCrystal = new Alumni({
  name: "chancrystal",
  graduate: FALL + 1990,
  github: 'chancrystal',
  body: ``
})

const DanielGur = new Alumni({ // UPDATED
  name: "Daniel Gur",
  graduate: SPRING + 1990,
  github: 'danielgur',
  body: `<p>HacKSU Founder</p>`
})

const DavidSteinberg = new Alumni({ // UPDATED
  name: "David Steinberg",
  graduate: SPRING + 1990,
  github: 'davidsteinberg',
  body: `<p>HacKSU Founder</p>`
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

const IsaacPark = new Alumni({ // UPDATED
  name: "Isaac Park",
  graduate: SPRING + 2017,
  github: 'IAPark',
  body: `<p>Developer</p><p>Leader</p>`
})

const IsaacBedard = new Alumni({
  name: "Isaac Bedard",
  graduate: FALL + 1990,
  github: 'ibedard16',
  body: ``
})

const JakeTobin = new Alumni({ // UPDATED
  name: "Jake Tobin",
  graduate: FALL + 2015,
  github: 'JakeTobin',
  body: `<p>Developer</p><p>Sponsorship</p>`
})

const JTRaber = new Alumni({ // UPDATED
  name: "JT Raber",
  graduate: SPRING + 2023,
  github: 'JMANN240',
  body: `<p>Marketing</p>`
})

const JoshuaBehler = new Alumni({ // UPDATED
  name: "Joshua Behler",
  graduate: SPRING + 2022,
  github: 'Joshua2000B',
  body: `<p>Sponsorship</p><p>Developer</p>`
})

const KristyConry = new Alumni({ // UPDATED
  name: "Kristi Conry",
  graduate: FALL + 2020,
  github: 'ktakattack',
  body: `<p>Outreach</p><p>Marketing</p>`
})

const MackenzieKinzel = new Alumni({
  name: "Mackenzie Kinzel",
  graduate: FALL + 2018,
  github: 'mackenziekinzel',
  body: `<p>Leader</p><p>Marketing</p><p>Food Coordinator</p>`
})

const MikeZrimsek = new Alumni({ // UPDATED
  name: "Mike Zrimsek",
  graduate: SPRING + 2017,
  github: 'mzrimsek',
  body: `<p>Developer</p>`
})

const TrentanTrahan = new Alumni({ // UPDATED
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

const NicLinscott = new Alumni({ // UPDATED
  name: "Nic Linscott",
  graduate: SPRING + 2016,
  github: 'nlinscott',
  body: `<p>Developer</p><p>Lesson Master</p>`
})

const PaulDilyard = new Alumni({
  name: "Paul Dilyard",
  graduate: FALL + 2015,
  github: 'pdilyard',
  body: `<p>Leader</p>`
})

const RobinBonatesta = new Alumni({
  name: "Robin Bonatesta",
  graduate: SPRING + 2016,
  github: 'robinbonatesta',
  body: `<p>Leader</p>`
})

const PJLeyden = new Alumni({ // UPDATED
  name: "P.J. Leyden",
  graduate: FALL + 2019,
  github: 'PJ-Leyden',
  body: `<p>Leader</p><p>The Comic Relief</p>`
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
  body: `<p>Developer</p><p>Logistics</p>`
})

const CollinWerner = new Alumni({ // UPDATED
  name: "Collin Werner",
  graduate: SPRING + 2020,
  github: 'collinw9898',
  body: `<p>Developer</p><p>Lesson Master</p>` //<p>Legendary Shitposter</p>
})
