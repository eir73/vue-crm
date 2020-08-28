<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>{{'Amount'|localize}}</th>
                <th>{{'Date'|localize}}</th>
                <th>{{'Category'|localize}}</th>
                <th>{{'Type'|localize}}</th>
                <th>{{'Open'|localize}}</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="(record, index) of records"
            :key="record.id"
        >
            <td>{{ ( page - 1 ) * pageSize + index + 1}}</td>
            <td>{{ record.amount | currency }}</td>
            <td>{{ record.date | date('datetime') }}</td>
            <td>{{ record.categoryName }}</td>
            <td>
            <span 
                class="white-text badge"
                :class="[record.typeInfo.class]"
            >
                {{ record.typeInfo.text }}</span>
            </td>
            <td>
            <button 
                @click="$router.push('/detail-record/' + record.id)"
                v-tooltip="'OpenRecord'"
                class="btn-small btn"
            >
                <i class="material-icons">open_in_new</i>
            </button>
            </td>
        </tr>
        </tbody>
        </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
    props: {
        records: {
            required: true,
            type: Array
        },
        page: {
            required: true,
            type: Number
        },
        pageSize: {
            required: true,
            type: Number
        }
    }
}
</script>