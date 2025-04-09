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
  <form class="bg-zinc-800/50 rounded-md text-white flex flex-col gap-2 sm:gap-3 p-3 sm:p-6">
    <input
      v-model="form.name"
      type="text"
      placeholder="Nombre"
      class="bg-zinc-700 rounded-md w-full outline-none p-2 text-white placeholder:text-zinc-400 text-sm sm:text-base"
    />
    <input
      v-model="form.phone"
      type="text"
      placeholder="Teléfono"
      class="bg-zinc-700 rounded-md w-full outline-none p-2 text-white placeholder:text-zinc-400 text-sm sm:text-base"
    />
    <input
      v-model="form.email"
      type="text"
      placeholder="Email (opcional)"
      class="bg-zinc-700 rounded-md w-full outline-none p-2 text-white placeholder:text-zinc-400 text-sm sm:text-base"
    />

    <div class="flex justify-center sm:justify-end gap-2 mt-1 sm:mt-0">
      <button
        @click="cancelContact"
        class="flex-1 sm:flex-none bg-zinc-700/90 hover:bg-zinc-700/60 transition-all duration-300 px-4 py-1.5 rounded-md text-white"
      >
        Cancelar
      </button>
      <button
        @click="saveContact"
        :disabled="!validateForm"
        class="flex-1 sm:flex-none bg-sky-900/90 hover:bg-sky-900/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-900/90 transition-all duration-300 px-2 py-1.5 rounded-md text-white"
        :class="{ 'opacity-50 cursor-not-allowed hover:bg-sky-900/90': isSaving }"
      >
        <div class="flex justify-center px-2">
          <SpinIcon v-if="isSaving" />
          <span>{{ isSaving ? "Guardando..." : "Guardar" }}</span>
        </div>
      </button>
    </div>
  </form>
</template>
