<template>
  <div class="bg-black text-white py-1 px-2 font-semibold">config</div>

  <form class="p-2" @submit.prevent="save">
    <label class="block mb-2">
      <div class="form-label">Max Risk</div>
      <input type="number" class="form-input" v-model="config.max_risk" @input="save" step="1" />
    </label>

    <label class="block mb-2">
      <div class="form-label">Taker fee</div>
      <input type="number" class="form-input" v-model="config.taker_fee" @input="save" step="0.01" />
    </label>

    <label class="block mb-2">
      <div class="form-label">Maker fee</div>
      <input type="number" class="form-input" v-model="config.maker_fee" @input="save" step="0.01" />
    </label>

    <button class="btn mt-4" type="submit">Save</button>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

const config = reactive({
  max_risk: 1,
  taker_fee: 0.1,
  maker_fee: 0.08,
});

function save() {
  console.log('save config', config)
  chrome.storage.local.set({ config });
}

onMounted(async () => {
  const storage = await chrome.storage.local.get('config');


  for (const [key, value] of Object.entries(storage.config)) {
    if (key in config) {
      config[key] = value;
    }
  }
})
</script>
