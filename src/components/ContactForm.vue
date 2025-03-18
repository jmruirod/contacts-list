<script setup lang="ts">
import type { Contact } from "@/store/contactListStore";
import SpinIcon from "@/components/icons/SpinIcon.vue";
import { computed, ref } from "vue";

const isSaving = ref(false);

const props = defineProps<{
  contact?: Contact;
}>();

const emit = defineEmits(["save", "close"]);

const form = ref<Partial<Contact>>({
  name: "",
  phone: "",
  email: "",
});

form.value.name = props.contact?.name ?? "";
form.value.phone = props.contact?.phone ?? "";
form.value.email = props.contact?.email ?? "";

const saveContact = async (event: Event) => {
  event.preventDefault();
  if (!validateForm.value || isSaving.value) return;
  isSaving.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    emit("save", form.value);
  } finally {
    isSaving.value = false;
  }
};

const cancelContact = (event: Event) => {
  event.preventDefault();
  emit("close");
};

const validateForm = computed(() => {
  return form.value.name !== "" && form.value.phone !== "";
});
</script>

<template>
  <form class="bg-zinc-800/50 rounded-lg text-white flex flex-col gap-3 px-6 py-6">
    <input
      v-model="form.name"
      type="text"
      placeholder="Nombre"
      class="bg-zinc-700 rounded-lg p-2 w-full outline-none px-2 text-white placeholder:text-zinc-400"
    />
    <input
      v-model="form.phone"
      type="text"
      placeholder="Teléfono"
      class="bg-zinc-700 rounded-lg p-2 w-full outline-none px-2 text-white placeholder:text-zinc-400"
    />
    <input
      v-model="form.email"
      type="text"
      placeholder="Email (opcional)"
      class="bg-zinc-700 rounded-lg p-2 w-full outline-none px-2 text-white placeholder:text-zinc-400"
    />

    <div class="flex justify-end gap-2">
      <button
        @click="saveContact"
        :disabled="!validateForm"
        class="bg-sky-900/90 hover:bg-sky-900/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-900/90 transition-all duration-300 p-2 rounded-lg text-white"
        :class="{ 'opacity-50 cursor-not-allowed hover:bg-sky-900/90': isSaving }"
      >
        <div class="flex px-2">
          <SpinIcon v-if="isSaving" />
          <span>{{ isSaving ? "Guardando..." : "Guardar" }}</span>
        </div>
      </button>
      <button @click="cancelContact" class="bg-zinc-700/90 hover:bg-zinc-700/60 transition-all duration-300 p-2 rounded-lg text-white">Cancelar</button>
    </div>
  </form>
</template>
