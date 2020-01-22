<template>
  <div style="width: 100%;">
  	<input id="emailsubscribe" spellcheck="false" v-bind:style="{ 'width': (this.$root.$data.mobile) ? '500px' : '50px', }" class="rounded widthitem" style="font-size: 2.5vh;" placeholder="email" v-on:input="validateEmail" v-on:change="validateEmail">
    <button class="green-bg rounded widthitem" style="font-size: 2.5vh;">subscribe</button>
  </div>
</template>

<style>

.widthitem {
  max-width: 80vw;
  margin: 20px;
}

#emailsubscribe {
  border: none;
	outline: none;
	padding: 1.25vh;
	transition: transform 0.25s, filter 0.25s;
}

#emailsubscribe:hover {
	transform: scale(1.1);
	filter: brightness(120%);
}

#emailsubscribe.valid {
  color: rgb(53, 201, 130);
}

#emailsubscribe.invalid {
  color: rgb(255, 80, 80);
}
</style>

<script>
  export default {
    data: () => {
      return {

      }
    },
    methods: {
      validateEmail: (email) => {
        console.log(email);
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email.target.value).toLowerCase())) {
          email.target.classList.add("valid");
          email.target.classList.remove("invalid");
        } else {
          if (email.type == "change") {
            email.target.classList.remove("valid");
            email.target.classList.add("invalid");
          } else {
            email.target.classList.remove("valid");
            email.target.classList.remove("invalid");
          }
        }
      },
    },
  }
</script>
