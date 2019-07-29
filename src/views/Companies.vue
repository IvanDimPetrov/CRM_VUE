<template>
    <div>

        <!-- <div id="companies-settings">
            Dara-bara
        </div> -->
        <Settings v-on:datecreated-sort="dateCreatedSort"
                  v-on:name-sort="nameSort"/>

        <Items v-bind:data="companies"/>

        <CreateCompany />

    </div>

</template>

<script>
    //import { mapGetters, mapActions } from "vuex"
    import EventBus from '../eventBus.js'
    import Settings from '../components/Settings.vue'
    import  CreateCompany from '../components/CreateCompany.vue'
    import Items from '../components/Items.vue'

    const sorting = {
        dateCreatedAsc: (a, b) => { 
            return a.datecreated > b.datecreated ? 1 : a.datecreated < b.datecreated ? -1 : 0;
            //return a.datecreated - b.datecreated; 
        },
        dateCreatedDesc: (a, b) => { 
            return a.datecreated < b.datecreated ? 1 : a.datecreated > b.datecreated ? -1 : 0;
            //return b.datecreated - a.datecreated; 
        },
        nameAsc: (a, b) => {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            //return a.name.localeCompare(b.name); 
        },
        nameDesc: (a, b) => {
            return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
            //return b.name.localeCompare(a.name); 
        }
    }


    export default {
        name: "Companies",
        components: {
            Settings,
            Items,
            CreateCompany
        },
        data() {
            return {
                dateCreatedOrder: sorting.dateCreatedDesc,
                nameOrder: sorting.nameAsc
            }
        },
        methods: {
            dateCreatedSort(type) {
                this.dateCreatedOrder = sorting[type];
            },
            nameSort(type) {
                this.nameOrder = sorting[type];
            }
        },
        computed: {        
            companies() {
                let companies = this.$store.getters.getCompanies;

                let sortingName = this.nameOrder;
                let sortingdateCreated = this.dateCreatedOrder;
                function sortingCompanies(a, b)  {
                    // let resdate = sortingName(a, b) 
                    // console.log(resdate); 
                    console.log(sortingName(a, b) || sortingdateCreated(a, b))
                    
                    return sortingName(a, b) && sortingdateCreated(a, b);
                }

                return companies.sort(sortingCompanies);
            }
        }
    }
</script>

<style src='../css/companies.css' scoped>
</style>