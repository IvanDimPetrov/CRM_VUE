<template>
    <div id="register-modal">

        <form id="register-form" v-on:submit.prevent="register">
           
            <h2>Register</h2>

            <label>User Name: </label>
            <input  type="text" 
                    v-model="formData.userName" 
                    required/>
         
            <label>Email: </label>
            <input type="email" 
                   v-model="formData.email" 
                   required/>
               
            <label>Password: </label>
            <input type="password" v-model="formData.password" required/>
           
            <label>Repeat password: </label>
            <input type="password" v-model="formData.repeatPassword" required/>
          
            <div class="register-buttons">
                <button type="submit">Register</button>
                <button type="text" v-on:click="cancel">Cancel</button>
            </div>
         
        </form>
    </div>
</template>

<script>
    import validations from '../validations.js'
    import { mapGetters, mapActions } from "vuex";

    export default {
        name: "Register",
        data() {
            return {
                formData: {
                    userName: "",
                    email: "",
                    password: "",
                    repeatPassword: ""
                }              
            }
        },
        methods: {
            ...mapActions(["RegisterUser"]),
            register(e) {
                let isValid = validations.Registration(this.formData);

                if (isValid == "OK") {
                    let dataToSend = {
                        username: this.formData.userName,
                        email: this.formData.email,
                        password: this.formData.password
                    }

                    this.RegisterUser(dataToSend)
                        .then((data) => {                            
                            this.$emit('show-message', "Successfull registration");
                            this.$emit('close-register');
                        })
                        .catch((errorStatus) => {
                            if (errorStatus == 409) {
                                this.formData.userName = "";
                                this.$emit('show-message', "User name already exists!!!");
                            }
                            else {
                                this.$emit('show-message', "Unauthorized action!!!");
                            }
                        })
                }
                else {                   
                    this.$emit('show-message', isValid);
                }    
            },
            cancel() {                
                this.$emit('close-register');
            }
        }
    }

</script>

<style  src="../css/register.css" scoped>
</style>