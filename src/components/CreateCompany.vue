<template>
        <div id="create-company">

            <h2>Create Company</h2>

            <div class="create-company-inputs">
                <label>Company Name</label>
                <input type="text" v-model="name"/>
            </div>

            <div class="create-company-inputs">
                <label>Company Address</label>
                <input type="text" v-model="address"/>
            </div>

            <div class="create-company-inputs">
                <label>Email</label>
                <input type="email" v-model="email"/>
            </div>

            <div class="create-company-inputs">
                <label>Web Site</label>
                <input type="text" v-model="website"/>
            </div>
          
            <div class="create-company-inputs">
                <label>Techoligies:</label>
                <input type="text" v-model="technologies"/>
            </div>


            <div class='create-company-buttons'>            
                <button v-on:click="save">Save</button>
                <button v-on:click="reset">Reset</button>
            </div>

        </div>
</template>

<script>
    import EventBus from '../eventBus.js'
    import { mapGetters, mapActions } from "vuex"

    export default {
        name: "CreateCompany",
        data() {
            return {
                name: "",
                address: "",
                email: "",
                website: "",
                technologies: ""                                 
            }
        },
        methods: {
            ...mapActions(["SaveCompany"]),
            save() {
                let dataToSend = {
                    name: this.name,
                    address: this.address,
                    email: this.email,
                    website: this.website,
                    technologies: this.technologies.split(/[ ,;]+/)
                }

                this.SaveCompany(dataToSend)
                    .then((data) => {
                        EventBus.$emit('show-message', "You created company successfully!!!");
                    })
                    .catch((error) => {
                        EventBus.$emit('show-message', "Something wrong is happening!!!");
                    })
            },
            reset() {
               for (let key in this.$data) {
                   this.$data[key] = "";
               }
            },
            disabledComponent(isGuest) {          
                let inputElements = this.$el.querySelectorAll("input, button");

                if (isGuest === true) {
                    disabledInputs(true)
                }
                else if (isGuest === false) {
                    disabledInputs(false);
                }

                function disabledInputs(arg) {
                    for (let input of inputElements) {
                        input.disabled = arg;
                    }
                }
            }
        },
        computed: {
            ...mapGetters(["isGuest"])
        },
        watch: {
            isGuest: function(value) {
                this.disabledComponent(value)
            }
        },
        mounted() {
            this.disabledComponent(this.isGuest);
        }
    }

</script>

<style src="../css/createCompany.css" scoped>
</style>