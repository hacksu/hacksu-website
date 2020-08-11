<template>
  <div class="alumni">
    <div style="height: calc(4vh + 20px);" class="navbar-scroll"></div>
    <alumni-header></alumni-header>
    <alumni-body></alumni-body>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      alumni: {
        "cseitz5": {
          graduation: {
            year: 2023,
            semester: 2, // fall = 1, spring = 2, summer = 3
          },
          picture: false, // Can be set to a specific image, otherwise; uses github
          info: {
            name: {
              first: "Chris",
              last: "Seitz",
            },
            role: ["Web Developer"],
          },
        },
        "Elizabeth1998": {
          graduation: {
            year: 2020,
            semester: 2, // fall = 1, spring = 2, summer = 3
          },
          picture: false, // Can be set to a specific image, otherwise; uses github
          info: {
            name: {
              first: "Elizabeth",
              last: "",
            },
            role: ["President", "Hacksu CEO"],
          },
        },
        "collinw9898": {
          graduation: {
            year: 2020,
            semester: 2, // fall = 1, spring = 2, summer = 3
          },
          picture: "https://cseitz.dev/widesal.png", // Can be set to a specific image, otherwise; uses github
          info: {
            name: {
              first: "Collin",
              last: "Werner",
            },
            role: ["Web Developer", "Expert Shitposter"],
          },
        },
        "bmvcbr": {
          graduation: {
            year: 2023,
            semester: 2, // fall = 1, spring = 2, summer = 3
          },
          picture: false, // Can be set to a specific image, otherwise; uses github
          info: {
            name: {
              first: "Katie",
              last: "Cochran",
            },
            role: ["Leader", "Pretty cool person", "Elizabeth Jr."],
          },
        },
        "brojowski": {
          graduation: {
            year: 2020,
            semester: 2, // fall = 1, spring = 2, summer = 3
          },
          picture: false, // Can be set to a specific image, otherwise; uses github
          info: {
            name: {
              first: "Alex",
              last: "G.",
            },
            role: ["Backend Developer", "Gamify Founder"],
          },
        },
        "gabdullah": {
          graduation: {
            year: 2019,
            semester: 2, // fall = 1, spring = 2, summer = 3
          },
          picture: false, // Can be set to a specific image, otherwise; uses github
          info: {
            name: {
              first: "Gabe",
              last: "A.",
            },
            role: ["Elizabeth Sr."],
          },
        },
        "bhollan5": {
          graduation: {
            year: 2019,
            semester: 2, // fall = 1, spring = 2, summer = 3
          },
          picture: false, // Can be set to a specific image, otherwise; uses github
          info: {
            name: {
              first: "Ben",
              last: "Holland",
            },
            role: ["Style Master"],
          },
        },

      },
    };
  },

}
</script>

<style>

</style>
