

export const discord = "https://discord.gg/rJDdvnt";

export const navigation = [
  ['Home', '/'],
  ['Kent Hack Enough', 'https://khe.io'],
  ['Alumni', '/alumni'],
  ['Contact', '/contact'],
  ['Constitution', '/constitution'],
]

import Alumni from '@/alumni';
export const alumni = {
  list: Alumni.map(o => o.export()),
  showCurrent: true,
  title: 'Hacksu Alumni',
  description: `Some Text`
};
console.log(alumni);

export const landing = {
  title: "Learn. Grow. Create.",
  body: "Hacksu teaches anyone, regardless of skill level or major, how to code.",
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
  virtual: false, //true,
  location: {
    virtual: `Due to COVID-19, all meetings are being held virtually through
      <a class="link" href="${discord}">discord</a>.`,
    building: {
      details: '<b>Math & Science Building</b> - Room 109',
      image: 'https://i.pinimg.com/originals/90/3d/b2/903db24fb1e148954205e4edf4faa669.jpg',
      url: 'https://map.concept3d.com/?id=568#!m/57924?sbc/?s/math%20and%20science%20building',
    },

  },
  body: "Hacksu teaches anyone, regardless of skill level or major, how to code.",
  button: "Get Involved",
}

export const involved = {
  discord,
  header: 'Subscribe to the Hacksu mailing list!',
  title: "The best way to stay informed is to subscribe to our mailing list.",
  description: "We'll let you know when we are meeting and fill you in on what is going on each week!",

}

export const contact = {
  title: "Contact Us",
  description: `If you have any questions regarding Hacksu,
  please feel free to contact us.
  One of us will get back to you as soon as possible.`,
  button: "Send",
}
