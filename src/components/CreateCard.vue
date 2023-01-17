<template>
    <div>
         <li  class="drag__el"  v-for="item in listOne" :key="item.title" draggable  @dragstart="startDrag($event, item), drag($event, item)">
            <h3> {{ item.title }}</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          </li>
    </div>
</template>