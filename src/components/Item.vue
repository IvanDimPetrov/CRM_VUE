<template>
    <div class="box">
        <div class="box-label">
            <label>Name:</label>
            <span> {{ data.name }} </span>
        </div>
        <div class="box-label">
            <label>Email:</label>
            <a v-if="data.email != 'N/A'" v-bind:href="'mailto:' + data.email"> {{ data.email }} </a>
            <span v-if="data.email == 'N/A'"> {{ data.email }} </span>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            data: {
                type: Object,
                required: true,
                validator: function(company) {
                    if (company != null) {
                        if (company.email == "") {
                            company.email = "N/A";                           
                        }
                    }

                    return company;
                }
            }
        }
    }

</script>

<style src='../css/item.css' scoped>
</style>