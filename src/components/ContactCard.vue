<script setup lang="ts">
import UserIcon from "@/components/icons/UserIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import ContactForm from "@/components/ContactForm.vue";
import type { Contact } from "@/store/contactListStore";
import { contactListStore } from "@/store/contactListStore";
import { computed, ref, watch } from "vue";

const showSuccess = ref(false);

const cardRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  contact?: Contact;
}>();

const isFormOpen = computed(() => {
  if (!props.contact) return contactListStore.isAddingContact;
  return contactListStore.currentContactId === props.contact?.id;
});

const editContact = () => {
  if (isFormOpen.value) {
    contactListStore.clearCurrentContact();
  } else {
    contactListStore.currentContactId = props.contact?.id as number;
    if (props.contact && props.contact?.id > -1) {
      contactListStore.isAddingContact = false;
    }
  }
};

const saveContact = (contact: Contact) => {
  if (contactListStore.isAddingContact) {
    contactListStore.addContact(contact);
  } else {
    contactListStore.updateContact({ ...contact, id: contactListStore.currentContactId });
  }

  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 2000);
};

const closeForm = () => {
  contactListStore.clearCurrentContact();
};

const confirmDelete = () => {
  contactListStore.deleteContact(props.contact?.id as number);
};

// Observa cuando el formulario se abre
watch(
  () => isFormOpen.value,
  (newValue) => {
    if (newValue && cardRef.value) {
      setTimeout(() => {
        // Encuentra el contenedor con scroll
        const scrollContainer = cardRef.value?.closest(".overflow-y-auto");
        if (!scrollContainer) return;

        // Calcular la posición exacta para mostrar toda la card con su formulario
        const cardRect = cardRef.value?.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        // Calculamos el nuevo scroll para posicionar la card al inicio
        const newScrollTop = scrollContainer.scrollTop + (cardRect!.top - containerRect.top);

        // Aplicamos el scroll con animación
        scrollContainer.scrollTo({
          top: newScrollTop,
          behavior: "smooth",
        });
      }, 350);
    }
  },
);
</script>

<template>
  <div ref="cardRef" class="flex flex-col bg-zinc-900/80 px-2 sm:px-6 py-3 hover:bg-sky-800/10 cursor-pointer transition-all duration-300">
    <div class="flex items-center gap-3 sm:gap-6">
      <div class="bg-zinc-800 rounded-full p-2 text-white">
        <UserIcon class="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]" />
      </div>
      <div class="relative flex flex-col w-[380px] justify-center min-h-[80px]">
        <h2 class="text-white text-xl sm:text-2xl font-bold truncate">{{ contact?.name }}</h2>
        <p class="text-zinc-400 text-xs sm:text-sm truncate">{{ contact?.phone }}</p>
        <div class="min-h-[20px]">
          <Transition name="fade">
            <p v-if="!showSuccess" class="text-zinc-400 text-xs sm:text-sm truncate">{{ contact?.email }}</p>
          </Transition>
          <Transition name="bounce">
            <div v-if="showSuccess" class="absolute bottom-2 left-0 text-emerald-500 text-xs sm:text-md font-bold text-nowrap">
              Contacto guardado correctamente.
            </div>
          </Transition>
        </div>
      </div>
      <div v-if="!contactListStore.isAddingContact" class="flex w-[50px] flex-col justify-end items-end gap-4">
        <button @click="editContact" class="text-white hover:text-white/80"><PencilIcon /></button>
        <button @click="confirmDelete" class="text-white hover:text-white/80"><TrashIcon /></button>
      </div>
    </div>
    <div class="max-h-0 overflow-hidden transition-all duration-400" :class="{ 'max-h-[400px] mt-6': isFormOpen }">
      <ContactForm :contact="contact" @save="saveContact" @close="closeForm" />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.bounce-enter-active {
  animation: bounce-in 0.5s ease;
}

.bounce-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.bounce-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes blink-grow {
  0%,
  100% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(0.8);
  }
}

.blink-grow {
  animation: blink-grow 1.2s infinite;
  transform-origin: center;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
