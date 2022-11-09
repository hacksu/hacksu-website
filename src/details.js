

export const discord = "https://discord.gg/rJDdvnt";

export const navigation = {
  default: [
    ['Home', '/'],
    // ['Kent Hack Enough', 'https://khe.io'],
    ['Alumni', '/alumni'],
    ['Contact', '/contact'],
    ['Constitution', '/constitution'],
  ]
}

import Alumni, { ShowCurrent as ShowCurrentAlumni } from '@/alumni';
export const alumni = {
  list: Alumni.map(o => o.export()),
  showCurrent: ShowCurrentAlumni,
  title: 'HacKSU Alumni',
  description: `Past and present leaders of HacKSU`
};
window.$alumni = alumni;
console.log(alumni);
// Alumni who haven't been updated yet
console.log(`PJ-Leyden, ktakattack`.split(', ').map(o => '@' + o).join('\n') + '\n' + $alumni.list.filter(o => o.graduate.includes('1990')).map(o => '@' + o.github).join('\n'));

export const landing = {
  title: "Learn. Grow. Create.",
  body: "HacKSU teaches anyone, regardless of skill level or major, how to code.",
  button: "Get Involved",
  social: [ // Please don't use more than 3 here or else it may overlap with the top right hacksu box
    {
      title: "Github",
      link: "https://github.com/hacksu",
      img: require("@/assets/images/github-white.svg"),

    },
  ],
}

export const meetings = {
  discord,
  time: "Every Tuesday at 7:00 PM",
  virtual: false,
  location: {
    virtual: `Due to COVID-19, all meetings are being held virtually through
      <a class="link" href="${discord}">discord</a>.`,
    building: {
      name: "Bowman Hall",
      room: "Room 218",
      image: require("@/assets/images/bowman.jpg"),
      url: 'https://map.concept3d.com/?id=568#!m/57856',
    },

  },
  body: "HacKSU teaches anyone, regardless of skill level or major, how to code.",
  button: "Get Involved",
}

export const involved = {
  discord,
  emailBlurb: {
    header: 'Subscribe to the HacKSU mailing list!',
    title: "We'll let you know when we are meeting and fill you in on what is going on each week!",
  },
  discordBlurb: {
    title: "Join our Discord server for weekly announcements and more!",
  },
  showDiscord: true,
  showEmailSignup: false,
}

export const contact = {
  title: "Contact Us",
  description: `If you have any questions regarding HacKSU,
  please feel free to contact us.
  One of us will get back to you as soon as possible.`,
  button: "Send",
}

