<template>
  <div class="involved">
    <div class="details">
      <h2>Get Involved!</h2>
      <div id="invite-container" v-html="inviteSVG"></div>
      <p>{{ title }}</p>
      <p>{{ description }}</p>
      <br>
      <p style="opacity: 0.5;">Subscribe to our mailing list</p>
      <input class="anchor-getInvolved" type="email" placeholder="Email" v-model="email">
      <button class="subscribe" v-on:click="subscribe">Subscribe</button>
      <div v-if="status.message" class="status-message" v-bind:class="{ 'positive': status.positive, 'negative': !status.positive, }">{{ status.message }}</div>
    </div>
  </div>
</template>

<script>
import { involved as details } from '@/details';
import inviteSVG from "!!raw-loader!@/assets/images/discordinvite.svg";

export default {
  name: 'Involved',
  data() {
    return {
      email: '',
      status: {
        positive: false,
        message: false,
      },
      inviteSVG,
      ...details,
    };
  },
  methods: {
    subscribe() {
      let { email } = this;
      let this_ = this;
      fetch('/api/mailinglist/subscribe', {
        method: 'POST',
        body: email,
      }).then(res => res.json()).then(res => {
        if (res.success) {
          this_.email = '';
          this_.status.positive = true;
          this_.status.message = "Thanks for subscribing! We'll let you know what we're doing each week!";
        } else {
          this_.status.positive = false;
          this_.status.message = res.error;
        }
      }).catch(err => {
        //alert('Failed to subscribe to mailing list! :(');
        this_.status.positive = false;
        this_.status.message = err.message;
        console.error(err);
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.involved {
  @include center;
  @include white-bg;
  color: black;
  padding-top: 5vh;
  padding-bottom: 5vh;
  h2 {
    font-size: 4vh;
  }
  .details {
    p {
      @include center;
      max-width: 80vw;
      font-size: 2.5vh;
    }
  }
  #invite-container {
    max-width: 95vw;
    margin: 0 auto;
  }
  input[type=email] {
    font-size: 2.5vh;
    width: 30vw;
    margin: 5px;
    @include mobile {
      width: 80vw;
    }
  }
  .subscribe {
    @include green-bg;
    font-size: 2.5vh;
    width: 10vw;
    @include mobile {
      width: 80vw;
    }
  }
  .status-message {
    padding-top: 0.5em;
    &.positive {
      @include green;
    }
    &.negative {
      @include red;
    }
  }
}

</style>

<style>
svg#discordinvite {
  max-width: 100%;
}
</style>
