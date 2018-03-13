<template>
    <div>
        <mt-header fixed :title="globalMark.name">
            <mt-button slot="left" @click="popupVisibleFN(true)">标签</mt-button>
            <mt-button slot="right" @click="goAddPlan()">增加计划</mt-button>
        </mt-header>
        <mt-popup
                v-model="popupVisible"
                position="right">
            <marks @popupVisibleFN='popupVisibleFN'></marks>
        </mt-popup>
    </div>
</template>
<script>

</script>