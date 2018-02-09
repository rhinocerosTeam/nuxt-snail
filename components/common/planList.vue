<template>
    <div>
        <ul>
            <li v-for="plan in planList">
                [{{ planStatus[plan.result]}}] [{{ plan.percent}}] {{ plan.planName }}
                <div class="date">
                    {{ formateDate(plan.startDatetime) }} ~ {{ formateDate(plan.endDatetime) }} 工时：{{plan.manHour}}
                    <span>
                        {{ getMarkName(plan.markId,plan.markKey) }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

</script>