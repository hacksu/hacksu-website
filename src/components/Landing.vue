<template>
  <div class="landing">

    <div class="hacksu-box box1" style=""/>
    <div class="hacksu-box box2" style=""/>
    <div class="background"/>

    <div class="content">
      <div class="buttons">
        <a
          v-for="(item, index) in social"
          v-bind:title="item.title"
          v-bind:href="item.link"
          v-bind:style="{ 'top': ('-' + (index * 10) + 'vh'), }"
          :key="item.link"
        >
          <img v-bind:src="item.img">
        </a>
      </div>
      <template v-if="!nextEvent">
        <img class="main-logo" src="@/assets/logo.svg">
        <h1 style="margin: 15px 0">{{ title }}</h1>
        <p>{{ body }}</p>
        <p style="opacity: 0.8;">Join our Discord for updates:</p>
        <div id="invite-container" v-html="inviteSVG"></div>
        <br/>
        <button>
          <a href="https://www.redbubble.com/people/KentStateCS/shop" target="_blank" rel="noopener noreferrer">Check Out Our Merch!</a>
        </button>
      </template>
      <template v-else>
        <div class="event-welcome">
            <span style="text-align: right; font-size: 2rem;font-variant: small-caps;">Come <br class="no-mobile" />to</span>
            <img style="height: 150px" src="@/assets/logo.svg">
        </div>
        <MeetingCard :event="nextEvent" :solo="true" background="rgb(34, 40, 113)" style="margin: 0 10px" />
        <a href="https://hacksu.com/discord" style="color: white;margin: 16px 0; font-size: 0.8rem; display:flex; align-items: flex-end; gap: 4px;">
            <img style="height: 0.8rem" src="@/assets/small-discord-logo-2024.svg"> Visit our Discord for more!
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import inviteSVG from "@/assets/images/discordinvite.svg?raw";
import { landing as details } from '@/details';
import { remult } from "remult";
import { Event } from "../../db/entities";
import MeetingCard from "./MeetingCard.vue";

export default {
    name: 'Landing',
    data() {
        return {
            ...details,
            inviteSVG,
            nextEvent: null
        };
    },
    mounted() {
        const now = new Date();
        // why did i use this date format in the Event class ??
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        // get next event on today or after today
        remult.repo(Event)
            .findFirst({ date: { "$gte": formattedDate } }, { orderBy: { date: "asc" } })
            .then(event => {
            if (event) {
                this.nextEvent = event;
            }
        });
    },
    components: { MeetingCard }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#invite-container {
  max-width: 95vw;
  margin: 0 auto;
  &:deep(svg) {
    max-width: 100%;
  }
}

.no-mobile {
    @media (max-width: 800px) {
        display: none;
    }
}

.event-welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    flex-shrink: 1;
    img {
        min-height: 80px;
        flex-shrink: 1;
    }
    gap: 18px;
    width: 450px;
    margin: 0 auto;
    padding: 10px 40px;
    border-radius: 10px;
    @media (max-width: 800px) {
        flex-direction: column;
        width: min-content;
    }
}


.landing {
  width: 100%;
  height: 100svh;
  overflow: hidden;

  #get-involved {
    @include transition;
  }

  .content {
    @include center;
    @include white;
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    height: 100svh;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    h1 {
      font-size: 4vh;
    }
    p {
      @include center;
      font-size: 3vh;
      width: 90vw;
    }
    button {
      @include green-bg;
      font-size: 3vh;
      width: 60vw;
      max-width: 40vh;
      a, a:visited {
        text-decoration: none;
        color: white;
      }
    }
  }
  .main-logo {
    width: 25vw;
    @media (max-width: 800px) {
        width: 60vw;
    }
  }
  .buttons {
    @include display-hide(mobile);
    position: absolute;
    width: 10vh;
    right: 30px;
    bottom: 30px;
    background: transparent;
    opacity: 0.25;
    float: right;
    img {
      @include transition;
      width: 10vh;
      margin-top: 20px;
    }
  }
  .background {
    position: absolute;
    z-index: -2;
    top: 0px;
    left: 0px;
    height: 100svh;
    width: 100vw;
    background-color: #142027;
  }
}

.hacksu-box {
	position: absolute;
	background-image: url(../assets/hacksu-box.png);
	background-size: contain;
	background-repeat: no-repeat;
	width: 40svh;
	max-width: 50vw;
	height: 40svh;
	max-height: 50vw;
	z-index: -1;
  &.box1 {
    background-position-y: 7svh;
    background-position-x: -14svh;
    left: 0px;
    bottom: 0px;
    @include display-not(mobile) {
      bottom: 0px;
    }
  }
  &.box2 {
    transform: rotate(90deg);
    background-position-x: -7svh;
    background-position-y: -14svh;
    right: 0px;
    top: 0px;
  }
}

</style>
