<template>
    <div class="detailOfCollection">
        <div class="detailOfCollection_item">
            <div class="detailOfCollection_item__bg">
                <img src="../assets/hecotoken.png" alt="">
            </div>
            <div class="detailOfCollection_item__detail">
                <div class="detailOfCollection_item_name"></div>
                <div class="detailOfCollection_item_nav"></div>
                <div class="property" v-if="showPropertyOfNFTCollection"></div>
                <div class="detail" v-if="showDetailOfNFTCollection"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showPropertyOfNFTCollection: true,
                showDetailOfNFTCollection: false
            }
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
    @import '~@/assets/stylesheet/detailOfCollection.less';
</style>