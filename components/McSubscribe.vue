<template>
  <portal
    v-if="enewsState"
    to="modal"
  >
    <viewport-wrapper
      :zIndex="10000"
      class='enews-wrapper'
      v-scroll-lock="enewsState"
    >  
      <div class="close-wrapper x-pad-single flex-center-vert">
        <button class="h2 close-button-menu" @click="closeEnews">
          <span>CLOSE</span>
        </button>
      </div>
      <div v-if="content" class="mailchimp-subscribe">
        <p class="h4">
          <span v-html="content.mail_scrape.enews_cta"/>
        </p>
        <form 
          class="mc-form"
          @submit.prevent="subscribe"
        >
          <input 
            v-model="email"
            ref="input"
            type="email"
            name="EMAIL"
            value=""
            :placeholder="content.mail_scrape.email_placeholder"
            required
          >
          <button id="sub" class="button-init h5" :click="subscribe">
            <span>Subscribe</span>
          </button>
          <div class="success" v-if="message">
            <p v-html="message"></p>
          </div>
        </form>
      </div>
    </viewport-wrapper>
  </portal>
</template>

<script>
import jsonp from 'jsonp';
import toQueryString from 'to-querystring'
import { mapState, mapMutations } from 'vuex'

export default {
  name: "McSubscribe",
  props: [
    'list',
    'placeholder',
    'success',
    'cta'
  ],
  data() {
    return {
      email: '',
      status: false,
      message: false,
    };
  },
  computed: {
    ...mapState({
      content: 'api',
      enewsState: 'enewsState'
    })
  },
  methods: {
    ...mapMutations({
      closeEnews: 'setEnews'
    }),
    subscribe() {
      const getAjaxUrl = url => url.replace('/post?', '/post-json?');
      const EMAIL = { EMAIL: this.$refs.input.value };
      const params = toQueryString(EMAIL);
      const url = `${getAjaxUrl(this.content.mail_scrape.mailchimp_url)}&${params}`;
      jsonp(
        url,
        {
          param: 'c',
        },
        (err, data) => {
          if (data.result === 'error') {
            this.status = err;
            this.message = data.msg;
          } else if (data.result === 'success') {
            this.status = 'success';
            this.message = this.content.mail_scrape.success_message;
          } else {
            this.status = 'error';
            this.message = data.msg;
          }
        },
      );
    },
  },
};
</script>

<style scoped>
.enews-wrapper {
  background-color: rgba(255,255,255,.85);
}
.mailchimp-subscribe {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 56rem;
  margin: auto;
}
.success {
  font-family: var(--font-a);
  color: var(--black);
  font-size: 1.5rem;
  text-align: left;
  padding-top: 3rem;
  margin: auto;
}
.success * {
  color: var(--black);
}
.success p a {
   color: var(--transparent);
  -webkit-text-fill-color: var(--transparent);
  -webkit-text-stroke-color: var(--black);
  -webkit-text-stroke-width: 1px;
  -webkit-font-smoothing: antialiased;
}
.success a:hover {
  color: var(--black);
}
.mc-form {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  line-height: 1.35;
  width: 100%;
  z-index: 1000;
}
.mc-form input[type=email],
.mc-form input[type=text],
.mc-form input[type=tel] {
  width: 100%;
  margin: auto;
  border-bottom: var(--border-black);
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  margin: 0;
  text-align: left;
  color: var(--black);
  -webkit-text-fill-color: var(--black);
  padding: 0;
  margin-bottom: 2rem;
  text-transform: uppercase;
  background-color: transparent;
  font-family: var(--font-a);
  font-style: var(--font-style-a);
  font-weight: var(--font-weight-a);
  font-size: var(--h4);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--black);
  line-height: 1.1;
}
.mc-form input[type=email]:focus,
.mc-form input[type=text]:focus,
.mc-form input[type=tel]:focus,
input:-internal-autofill-selected {
  outline: none!important;
  box-shadow: 0;
  background-color: transparent!important;
}
::-webkit-input-placeholder,
::-moz-placeholder {
  font-family: var(--font-a);
  color: var(--black);
}
#sub {
  text-align: right;
}
@media (--lg) {
  .mailchimp-subscribe {
    padding: var(--pad-single) 0;
  }
}
</style>
