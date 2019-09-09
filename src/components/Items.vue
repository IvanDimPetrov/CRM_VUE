<template>
    <div class="items">

        <div v-if="data.length <= 0"
             class="spinner">
            <div class="double-bounce1"></div>
            
            <div class="double-bounce2">
                <span>NO DATA</span>
            </div>
        </div>

        <Item class="item"
              v-for="item in pagedItems"
              v-bind:key="item._id"
              v-bind:data="item"/>

        <Pager v-show="pagerSnow"
               v-bind:data="pagerData"
               v-on:change-page="changePage"/>
    </div>
</template>

<script>

    import Item from './Item.vue'
    import Pager from './Pager.vue'

    export default {
        name: "Items",
        components: {
            Item,
            Pager
        },
        props: {
            data: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                limit: 5,
                startIndex: 0
            }
        },
        methods: {
            changePage(page) {
                this.startIndex = (page - 1) * this.limit;
            }
        },
        computed: {
            pagedItems() {
                let endIndex = this.startIndex + this.limit;
                return this.data.slice(this.startIndex, endIndex);
            },
            pagerData() {
                return {
                    limit: this.limit,
                    count: this.data.length
                }
            },
            pagerSnow() {
                if (this.data.length > this.limit) {
                    return true;
                }

                return false;
            }
        }
    }

</script>

<style src='../css/items.css' scoped>
</style>