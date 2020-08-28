<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input 
          id="name" 
          type="text" 
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">Имя</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Введите имя</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators' 

export default {
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru'
    setTimeout(M.updateTextFields, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru' : 'en'
        })
      } catch (e) {
        throw e
      }
    }
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>