<template>
  <div class="section-getinvolved">
  	<div class="center" style="margin-top: 10vh;">

      <div class="center" style="color: black;">
        <h2 class="center" style="font-size: 4vh; max-width: 65%;">{{ content.title }}</h2>
        <p class="center" style="font-size: 2.5vh; width: 80vh; max-width: 80vw;" v-html="content.body"></p>
        <br><br>
        <p class="center" style="font-size: 2vh; opacity: 0.5;">{{ content.subtext }}</p>

        <email-subscribe></email-subscribe>
      </div>

      <modal id="modal1" style="color: black;">
        <div class="center">
          <img style="height: 20vh; max-height: 30vw; max-width: 80vw;" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/816158/hacksu-logo.svg" />
          <h2 style="font-size: 4vh; max-width: 95%;">{{ modal.title }}</h2>
      		<p class="center" style="font-size: 2.5vh; max-width: 90%;">{{ modal.body }}</p>
          <email-subscribe></email-subscribe>

        </div>
      </modal>

    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        content: {
          title: "Get Involved!",
          body: `The best way to stay informed is to subscribe to our mailing list.
                    <br><br>
                  We'll let you know when we are meeting and fill you in on what is going on each week!`,
          subtext: "Subscribe to email updates",

        },
        modal: {
          title: "Subscribe to the Hacksu mailing list!",
          body: "We'll let you know when we are meeting and fill you in on what is going on each week!",

        },

      }
    },
  }
</script>

<style>

#modal1 .emailsubbtn {
  width: 100%!important;
}

.section-getinvolved {
  width: 100%;
  padding-bottom: 5vh;
  overflow-y: hidden;
  background-color: #EBEEF0;
}




</style>
