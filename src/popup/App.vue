<template>
  <div class="bg-black text-white py-1 px-2 font-semibold">config</div>

  <form class="p-2" @submit.prevent="save">
    <label class="block mb-2">
      <div class="form-label">Max Risk</div>
      <input type="number" class="form-input" v-model="config.max_risk" @input="save" step="0.1" />
    </label>

    <label class="block mb-2">
      <div class="form-label">Maker fee</div>
      <input type="number" class="form-input" v-model="config.maker_fee" @input="save" step="0.01" />
    </label>

    <label class="block mb-2">
      <div class="form-label">Taker fee</div>
      <input type="number" class="form-input" v-model="config.taker_fee" @input="save" step="0.01" />
    </label>

    <label class="block mb-2">
      <div class="form-label">Stop-Loss key</div>

      <select class="form-input" v-model="config.sl_hold_key" @change="save">
        <option v-for="key in META_KEYS" :value="key" :disabled="config.price_hold_key === key">
          {{ key }}
        </option>
      </select>
    </label>

    <label class="block mb-2">
      <div class="form-label">Enter price key</div>

      <select class="form-input" v-model="config.price_hold_key" @change="save">
        <option v-for="key in META_KEYS" :value="key" :disabled="config.sl_hold_key === key">
          {{ key }}
        </option>
      </select>
    </label>

    <label class="mb-2 flex items-center">
      <input type="checkbox" v-model="config.auto_open_market_tab" @change="save" />
      <span class="ml-1">Auto open market tab</span>
    </label>

    <label class="mb-2 flex items-center">
      <input type="checkbox" v-model="config.hide_balance" @change="save" />
      <span class="ml-1">Hide balance</span>
    </label>

    <label class="mb-2 flex items-center">
      <input type="checkbox" v-model="config.include_fees" @change="save" />
      <span class="ml-1">Include fees in order amount</span>
    </label>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { defaultConfig } from '../config/default-config';
import { META_KEYS } from '../constants';

const config = reactive({ ...defaultConfig });

function save() {
  console.log('save config', config);
  chrome.storage.local.set({ config });
}

onMounted(async () => {
  const storage = await chrome.storage.local.get('config');

  console.dir('load config', storage.config);

  if (!storage.config) {
    return;
  }

  for (const [key, value] of Object.entries(storage.config)) {
    if (key in config) {
      config[key] = value;
    }
  }
});
</script>
