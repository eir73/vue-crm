<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record" >
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">{{ record.typeInfo.text }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div 
            :class="record.typeInfo.class"
            class="card"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись не найдена</p>
  </div>
</template>

<script>
export default {
  name: 'detail-record', 
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title,
      typeInfo: record.type === 'income' ? { class: 'green', text: 'Доход' } : { class: 'red', text: 'Расход' },
    }

    this.loading = false
  }
}
</script>