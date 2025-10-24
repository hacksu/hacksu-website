export const discord = "https://discord.gg/rJDdvnt";

import bowmanImage from "@/assets/images/bowman.jpg";
import githubImage from "@/assets/images/github-white.svg";
import msbImage from "@/assets/images/msb.jpg";

export const landing = {
  //title: "Learn. Grow. Create.",
  title: "Learn. Grow. Create",
  body: "HacKSU teaches anyone, regardless of skill level or major, how to code.",
  button: "Get Involved",
  social: [ // Please don't use more than 3 here or else it may overlap with the top right hacksu box
    {
      title: "Github",
      link: "https://github.com/hacksu",
      img: githubImage,

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
      name: "Mathematical Sciences Building",
      room: "Room 228",
      image: msbImage,
      url: 'https://map.concept3d.com/?id=568#!m/57924?s/msb',
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

