<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<!-- in style ha dar kole application ghabele dastresi hastand -->

<style>
.font-big {
  font-size: 16px;
}

.font-small {
  font-size: 11px;
}

.q-item {
  min-width: none !important;
}

.mx-default {
  margin-right: 20px;
  margin-left: 20px;
}

.my-default {
  margin-top: 14px;
}

.my-big {
  margin-top: 20px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}
</style>
