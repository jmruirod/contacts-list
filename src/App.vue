<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
</script>

<template>
  <main class="relative min-h-screen flex justify-center items-center bg-gray-900 pt-10">
    <content class="bg-zinc-900/80 m-w-xl w-full max-w-xl h-full rounded-t-xl">
      <header class="bg-sky-900/90 pt-6 pb-4 px-6 rounded-t-xl">
        <h1 class="text-white text-4xl font-bold">Agenda</h1>
      </header>
      <div class="mt-5 flex flex-col gap-2">
        <div class="px-6 py-2">
          <div class="flex gap-2 bg-zinc-700 rounded-lg p-2">
            <input type="text" placeholder="Buscar contacto..." class="w-full outline-none px-2 text-white placeholder:text-zinc-400" />
            <button class="text-white hover:text-white/80"><SearchIcon /></button>
          </div>
        </div>
        <div class="flex items-center justify-between gap-6 bg-zinc-900/80 px-6 py-3 hover:bg-sky-800/10 cursor-pointer transition-all duration-300">
          <div class="bg-zinc-800 rounded-full p-2 text-white">
            <UserIcon />
          </div>
          <div class="flex flex-col w-[380px]">
            <h2 class="text-white text-2xl font-bold truncate">Juan Perez</h2>
            <p class="text-zinc-400 text-sm truncate">+54 9 11 3333-3333</p>
            <p class="text-zinc-400 text-sm truncate">juanperez@gmail.com</p>
          </div>
          <div class="flex w-[50px] flex-col justify-end items-end gap-4">
            <button class="text-white hover:text-white/80"><PencilIcon /></button>
            <button class="text-white hover:text-white/80"><TrashIcon /></button>
          </div>
        </div>
      </div>
    </content>
  </main>
</template>

<style scoped></style>
