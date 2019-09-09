<template>
    <div id="pager">
        <button class="pager-button"
                v-on:click="firstPage"
                v-bind:disabled="prevEnable">
           ❮❮
        </button>
        <button class="pager-button"
                v-on:click="prevPage"
                v-bind:disabled="prevEnable">
           ❮
        </button>
        <div class="pager-page"
             v-bind:key="pg"
             v-for="pg in pages"
             v-on:click="onPage(pg)"
             v-bind:class="{'pager-page-active': pg == page}">
                {{ pg }}
        </div>
        <button class="pager-button"
                v-on:click="nextPage"
                v-bind:disabled="nextEnable">
            ❯
        </button>
        <button class="pager-button"
                v-on:click="lastPage"
                v-bind:disabled="nextEnable">
           ❯❯
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                page: 1,
                visiblePagesCount: 5
            }
        },
        methods: {
            onPage(page) {
                this.page = page;
                this.$emit('change-page', page);
            },
            firstPage() {
                this.page = 1;
                this.$emit('change-page', 1);
            },
            nextPage() {
                if (this.page * this.data.limit <= this.data.count) {
                    this.$emit('change-page', ++this.page);
                }               
            },
            prevPage() {
                if (this.page !== 1) {
                    this.$emit('change-page', --this.page);
                }              
            },
            lastPage() {
                let pageCount = this.pagesCount;
                this.page = pageCount;
                this.$emit('change-page', pageCount);
            }
        },
        computed: {
            pages: function() {           
                let pages = Array.from(Array(this.pagesCount).keys())
                                 .map((page) => {
                                        return page + 1;
                                    });

                let startIndex = (this.page - 1) - parseInt((this.visiblePagesCount / 2), 10);

                if (startIndex < 0) {
                    startIndex = 0;
                }
        
                let endIndex = startIndex + this.visiblePagesCount;

                if (endIndex > pages.length) {
                    endIndex = pages.length;
                    startIndex = endIndex - this.visiblePagesCount < 0 ? 0 : endIndex - this.visiblePagesCount;
                }

                let slicedPages = pages.slice(startIndex, endIndex);

                return slicedPages;
            },
            pagesCount() {
                return Math.ceil(this.data.count / this.data.limit);
            },
            prevEnable: function() {
                if (this.page === 1) {
                    return true;
                }
                return false;
            },
            nextEnable: function () {
                if (this.page * this.data.limit >= this.data.count) {
                    return true;
                }
                return false;
            }
        }
    }   
</script>

<style src='../css/pager.css' scoped>
</style>