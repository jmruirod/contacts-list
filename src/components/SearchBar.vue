<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue";
import { contactListStore } from "@/store/contactListStore";

const searchContacts = (event: Event) => {
  const search = (event.target as HTMLInputElement).value;

  if (search.length === 0) {
    contactListStore.filteredContacts = contactListStore.contacts.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    contactListStore.searchContacts(search);
  }
};
</script>

<template>
  <div class="flex gap-2 bg-zinc-700 rounded-md p-2">
    <input type="text" placeholder="Buscar contacto..." @input="searchContacts" class="w-full outline-none px-2 text-white placeholder:text-zinc-400" />
    <button class="text-white hover:text-white/80"><SearchIcon /></button>
  </div>
</template>
