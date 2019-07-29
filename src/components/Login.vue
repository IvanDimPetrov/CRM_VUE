<template>
    <div id="login-modal">

        <form id="login-form" v-on:submit.prevent="login">

            <h2>Login</h2>

            <label>User name:</label>
            <input v-model="username" type="text" />

            <label>Password:</label>
            <input v-model="password" type="password" />

            <div class="login-buttons">
                <button type="submit">Login</button>
                <button type="text" v-on:click="cancel">Cancel</button>
            </div>

        </form>

    </div>
</template>

<script>

    import { mapGetters, mapActions } from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            ...mapActions(["LoginUser"]),
            login(e) {
                
                var dataToSend = {
                    username: this.username,
                    password: this.password
                }
                
                this.LoginUser(dataToSend)
                    .then((data) => {
                        this.$emit('show-message', "Login successfully!!!");                  
                        this.$emit('close-login');
                    })
                    .catch((errorStatus) => {
                        this.username = "";
                        this.password = "";
                        this.$emit('show-message', "Invalid Credentials!!!"); 
                    })
            },
            cancel() {
                this.$emit('close-login')
            }
        }
    }

</script>

<style src="../css/login.css" scoped>
</style>