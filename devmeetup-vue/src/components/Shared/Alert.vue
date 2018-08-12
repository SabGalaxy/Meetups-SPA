<template>
  <v-alert error dismissible @input="onClose" :value="true" icon="warning" color="error" outline>
    {{ text }}
  </v-alert>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>