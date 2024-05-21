<script setup lang="ts">
import { ref } from "vue"
const obj = ref({
  name: "zs",
  age: 18,
  sex: "male"
})
</script>

<template>
  <div>
    {{ obj.name }}
  </div>
</template>
