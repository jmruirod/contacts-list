<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import ContactCard from "@/components/ContactCard.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import { contactListStore } from "@/store/contactListStore";
import { watch } from "vue";
const contactsStorage = localStorage.getItem("contacts");

if (contactsStorage) {
  contactListStore.contacts = JSON.parse(contactsStorage);
  contactListStore.sortContacts();
  contactListStore.filteredContacts = contactListStore.contacts;
}

watch(
  () => contactListStore.contacts,
  (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  },
);
</script>

<template>
  <div
    class="relative flex flex-col bg-zinc-900/80 m-w-xl w-full max-w-xl h-screen overflow-hidden sm:min-h-full sm:h-auto sm:max-h-[85vh] sm:rounded-lg sm:shadow-2xl"
  >
    <header class="bg-sky-900/90 pt-6 pb-4 px-6 sm:rounded-t-lg">
      <h1 class="text-white text-4xl font-bold">Agenda</h1>
    </header>
    <section class="relative flex flex-col gap-2 overflow-hidden">
      <div class="px-6 pt-6 pb-2 shrink-0">
        <SearchBar />
      </div>
      <div class="px-6 py-2 shrink-0">
        <h2 class="text-white text-2xl font-semibold">
          {{ contactListStore.isAddingContact ? "Añadir contacto" : `Contactos (${contactListStore.contacts.length})` }}
        </h2>
      </div>
      <div class="relative min-h-[570px] grow overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <Transition>
          <div v-if="!contactListStore.isAddingContact" class="divide-y divide-gray-700">
            <ul>
              <TransitionGroup name="list" tag="ul">
                <li v-for="contact in contactListStore.filteredContacts" :key="contact.id">
                  <ContactCard :contact="contact" />
                </li>
              </TransitionGroup>
            </ul>
          </div>
        </Transition>
        <Transition>
          <div v-if="contactListStore.isAddingContact" class="absolute top-0 w-full flex flex-col">
            <ContactCard />
          </div>
        </Transition>
      </div>
    </section>
    <Transition>
      <button
        v-if="!contactListStore.isAddingContact && contactListStore.currentContactId === -1"
        @click="
          contactListStore.isAddingContact = true;
          contactListStore.currentContactId = -1;
        "
        class="absolute bottom-10 right-15 bg-sky-900/90 hover:bg-sky-900/60 transition-all duration-300 p-2 rounded-full text-white"
      >
        <AddIcon />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: transform 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
