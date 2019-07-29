<template>
  <div id="app">
    <div id="nav">
      <router-link class="left-links" to="/">Home</router-link>
      
      <router-link class="left-links" to="/companies">Companies</router-link>

      <router-link class="left-links" to="/people">People</router-link>


      <a class="left-links right-links" 
         href="javascript:void(0)" 
         v-if="isUser" 
         v-on:click="logout">
          Logout {{ user.username }}
      </a>


      <a class="left-links right-links" 
         href="javascript:void(0)" 
         v-if="!isUser" 
         v-on:click="register">
          Register
      </a>

      <a class="left-links" 
         href="javascript:void(0)"
         v-on:click="login"
         v-if="!isUser"> 
        Login 
      </a>

      
      <router-link class="left-links" to="/about">About</router-link>
    </div>

    <keep-alive>
      <router-view id="router-view"/>
    </keep-alive>

    <div id="message" > 
      <p></p>
    </div>

    <Register v-if="registerView"
              v-on:show-message="showMessage"
              v-on:close-register="closeRegister"/>


    <Login v-if="loginView"
           v-on:show-message="showMessage"
           v-on:close-login="closeLogin"/>

  </div>
</template>


<script>

  import Register from './components/Register.vue'
  import Login from './components/Login.vue'
  import { mapGetters, mapActions } from "vuex";
  import { setTimeout } from 'timers';
  import EventBus from './eventBus.js'


  export default {
    name: "App",
    components: {
        Register,
        Login
    },
    data() {
      return {
        registerView: false,
        loginView: false,
      }
    },
    methods: {
        ...mapActions(["LogoutUser", "LoginGuest", "GetAllCompanies"]),
        register() {
          document.getElementById("app").style.overflow = "hidden";
          this.registerView = true;
        },
        closeRegister() {
          document.getElementById("app").style.overflow = "auto";
          this.registerView = false;
        },
        login(e) {
          document.getElementById("app").style.overflow = "hidden";
          this.loginView = true;
        },
        closeLogin(){
          document.getElementById("app").style.overflow = "auto";
          this.loginView = false;
        },
        logout() {

          this.LogoutUser()
              .then(() => {            
                this.LoginGuest()
                    .then((data) => {
                      this.showMessage("Logout successfully!!!");
                    })                      
              })
              .catch((error) => {
                this.showMessage("Invalid credentials!!!");
              });  
          
        },
        showMessage(message) {
        
          let messageDiv = this.$el.querySelector("#message");

          messageDiv.style.opacity = "0.9";         
          messageDiv.getElementsByTagName("p")[0].innerHTML = message;

          setTimeout( () => {
               messageDiv.style.opacity = "0";
          }, 3000)
        }
    
    },
    computed: {
      ...mapGetters(["isUser", "user"])
    },
    mounted() {
      EventBus.$on('show-message', this.showMessage)
    },
    created() {
     
      this.LoginGuest()
          .then((data) => {       
            this.showMessage(`Welcome ${data.username}`);
            this.GetAllCompanies();
          })
    }

  }
</script>

<style>
  html, body, #app {
    position: relative;
    min-height: 100%;
    min-width: 100%;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: baseline; 
  }
  h1, h2, h3, span {
    margin: 0;
    padding: 0;
    border: 0;
  }
  #router-view {
    position: absolute;
    background: #DDDDDD;
    min-width: 100%;
    min-height: 91.5%;
    z-index: 1;
  }
  #nav {
    display: flex;
    flex-direction: row;
    background: black;
    width: 100%;
    height: 8.5%;
  }
  #nav a {
    display:flex;
    background: #3B3939;   
    border-radius: 5px;
    width: 10%;
    align-items:center;
    justify-content:center;
    color: #DDDDDD;
    text-decoration: none;
  } 
  .left-links {
    height: 70%;
    margin-top: 0.55%;
    margin-right: 10px;
    margin-left: 10px;
  }
  .right-links {  
    margin-left: auto;
  }
  #nav > a:hover{
    background-color: rgb(129, 103, 103);
  }
  #message {
    opacity: 0;
    z-index: 3;
    background:  #9F7373;
    position: fixed;
    top: 8.6%;
    right: 0%;
    width: 20%;
    height: 8%;
    border-radius: 10px  0px 0px 10px;
    transition: opacity 1s ease-in-out;
  }
  #message p {
    padding: 3%;
    text-align: center;
    font-weight: bold;
    color: #DDDDDD
  }
</style>
