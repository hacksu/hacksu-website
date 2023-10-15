<template>
  <div class="contact">
    <div class="header">
      <div style="height: 5vh"/>
      <h1>{{ title }}</h1>
      <h3 class="description" v-html="description"/>
      <h3>email hacksu@cs.kent.edu</h3>
    </div>
    <!--
    <div class="body">
      <span class="inputs">
        <p>Your Name</p>
        <input type="text"
          v-model="submission.name"
          placeholder="John Doe"
        >
        <p>Your Email</p>
        <input type="email"
          v-model="submission.email"
          placeholder="email@example.com"
        >
        <p>Subject</p>
        <input type="text"
          v-model="submission.subject"
          placeholder="What do you need to talk to us about?"
        >
        <p>Content</p>
        <textarea
          v-model="submission.body"
          placeholder="Write your message here."
        />
        <br>
        <br>
        <button class="submit" v-on:click="submit">{{ statusText }}</button>
      </span>
      <span class="response">
        <br>
        <img style="height: 10vh" src="@/assets/green-checkmark.svg">
        <br><br>
        Message Sent!
      </span>
    </div>
  -->
  </div>
</template>

<script>
// @ is an alias to /src
import { contact as details } from '@/details'

export default {
  name: 'Contact',
  data() {
    return {
      ...details,
      submission: {},
      status: false,
    };
  },
  computed: {
    statusText() {
      return this.status || this.button;
    }
  },
  methods: {
    clean() {
      if (this.$el) {
        let body = this.$el.querySelector('.body');
        if (body){
          body.classList.remove('respond');
          body.querySelector('.response').classList.remove('ready');
          for (let x of Object.values(this.$el.querySelectorAll('input, textarea, button'))) {
            x.removeAttribute('disabled');
          }
        }
      }
      this.status = false;
      this.submission = {
        subject: '',
        name: '',
        email: '',
        body: '',
      }
    },
    submit(event) {
      console.log(event);
      let button = event.target;
      button.setAttribute('disabled', 'true');
      this.status = 'Sending...';
      for (let x of Object.values(button.parentElement.querySelectorAll('input, textarea'))) {
        x.setAttribute('disabled', 'true')
      }
      let { submission, success } = this;
      console.log(JSON.stringify(submission));
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      }).then(res => res.json()).then(res => {
        success();
      })
      /*setTimeout(function() {
        success();
      }, 2000)*/

    },
    success() {
      let body = this.$el.querySelector('.body');
      body.classList.add('respond');
      setTimeout(function() {
        body.querySelector('.response').classList.add('ready');
      }, 500)
      let _this = this;
      setTimeout(function() {
        _this.clean();
      }, 10000)
    }
  },
  mounted() {
    this.clean();
  },
}
</script>

<style scoped lang="scss">

.contact {
  @include center;
  //@include white-bg;
  @include mobile {
    @include white-bg;
    min-height: 100vh;
  }
  @include display-not(mobile) {
    background: linear-gradient(to top left, #35c982, #4683FF);
    min-height: 100vh;
  }
  //background: linear-gradient(to top left, #35c982, #4683FF);
  //min-height: 100vh;
  .header {
    text-align: center;
    width: 100vw;
    padding-top: $navbar-height;
    padding-bottom: 5vh;
    @include mobile {
      background: linear-gradient(to top left, #35c982, #4683FF);
    }
    .description {
      @include center;
      width: 80vw;
      max-width: 60vmin;
      font-weight: 200;
    }
  }
  .body {
    @include white-bg;
    color: black;
    padding: 3vh;
    @include display-not(mobile) {
      @include rounded;
      min-height: 20vh;
      min-width: 40vw;
      max-width: 40vmax;
      display: inline-block;
      transition: min-width 0.5s, min-height 0.5s;
    }
    p {
      text-align: left;
    }
    input {
      width: calc(100% - 2.5vh);
    }
    textarea {
      $width: calc(100% - 2.5vh);
      width: $width;
      max-width: $width;
      min-width: $width;
    }
    .submit {
      @include green-bg;
      width: 40%;
      max-width: 300px;
      transition: transform 0.25s, filter 0.25s, opacity 0.25s, background 0.25s;
      &[disabled] {
        opacity: 0.5;
        background-color: grey;
        cursor: wait;
      }
    }
    &.respond {
      @include display-not(mobile) {
        @include rounded;
        min-height: 20vh;
        min-width: 20vw;
        max-width: 40vmax;
        display: inline-block;
      }
      .inputs {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        max-width: 0px;
        max-height: 0px;
        opacity: 0;
      }
      .response {
        margin-top: 0px;
        display: inline-block;
        //max-height: 50vh;
        max-height: 0px;
        &.ready {
          opacity: 1;
          pointer-events: initial;
          max-height: 50vh;
        }
      }
    }
    .response {
      opacity: 0;
      pointer-events: none;
      display: none;
      transition: opacity 0.75s, max-height 0.5s, margin-top 0.5s;
      max-height: 0px;
      margin-top: -200%;
      overflow: hidden;
    }
    .inputs {
      display: block;
      transition: max-width 0.5s, max-height 0.5s, opacity 0.5s;
      max-height: 100vh;
      max-width: 100vw;
    }
  }
}



</style>
