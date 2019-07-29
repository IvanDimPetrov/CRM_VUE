<template>
    <div id="settings">

        <div>
            <h3>Order by Name:</h3>
            <div>
                <label>Ascending</label>
                <input type="radio" name="name" value="nameAsc" checked
                       v-on:click="nameChange"/>
            </div>
            <div>
                <label>Descending</label>
                <input type="radio" name="name" value="nameDesc"
                       v-on:click="nameChange"/>
            </div>        
        </div>

        <div>
            <h3>Order by Date Created:</h3>
            <div>
                <label>Newest</label>
                <input type="radio" name="datecreated" value="dateCreatedDesc" checked
                       v-on:click="dateCreatedChange"/>
            </div>
            <div>
                <label>Oldest</label>
                <input type="radio" name="datecreated" value="dateCreatedAsc"
                       v-on:click="dateCreatedChange"/>
            </div>        
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data() {
            return {

            }
        },
        methods: {
            dateCreatedChange(e) {
                this.$emit('datecreated-sort', e.target.value)
            },
            nameChange(e) {
                this.$emit('name-sort', e.target.value);
            }
        }

    }
</script>

<style src='../css/settings.css' scoped>
</style>