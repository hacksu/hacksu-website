<template>
  <div style="width: 100%; height: 85vh; overflow-y: hidden; background-color: #EBEEF0;">
  	<div style="text-align: center; margin-left: auto; margin-right: auto; margin-top: 10vh;">


      <email-subscribe></email-subscribe>

      <modal id="modal1" style="color: black;">
        <div style="text-align: center;">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/816158/hacksu-logo.svg" style="height: 20vh; max-height: 30vw; max-width: 80vw;" />
          <h2 style="font-size: 4vh; max-width: 95%;">Subscribe to the Hacksu mailing list!</h2>
      		<p style="font-size: 2.5vh; max-width: 90%; margin-left: auto; margin-right: auto;">We'll let you know when we are meeting and fill you in on what is going on each week!</p>
          <email-subscribe></email-subscribe>

        </div>
      </modal>

      <button v-on:click="" class="green rounded">test1</button>


      <navbtn dropdown>Dropdown
  			<dropdown>
  				<button>yeet</button>
  				<button>ok</button>
  				<button>what</button>

  			</dropdown>
  		</navbtn>
      
    </div>
  </div>
</template>

<style>
#modal1 .emailsubbtn {
  width: 100%!important;
}
</style>

<script>
  export default {
    data: function() {
      return {

      }
    },
  }
</script>
