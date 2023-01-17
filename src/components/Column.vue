<<template>
    <div class="columns">
        <!-- columns -->
        <div class="columns__column"  v-for="column in columns" :key="column.id" slot="">
          <header class="column__header"> {{column.title}}
            <button class="column__button column__button--close"  @click="deleteColumn(column)">x</button>
          </header>
        <ul 
          class="cards drop__zone" 
          @drop="onDrop($event, column.id)"
          @dragover.prevent  
          @dragenter.prevent
        >
          <li  class="drag__el"  v-for="item in listOne" :key="item.title" draggable  @dragstart="startDrag($event, item), drag($event, item)">
            <h3> {{ item.title }}</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lobortis enim sit amet metus laoreet, ut condimentum
          </li>
        </ul>

        <footer>
           <create-modal name="example">This is a modal</create-modal>
          <input
            type="text"
            class="input__new__card"
            placeholder="Add new Card"
            v-model="cardName"
            @keyup="createCard"
          />
        </footer>
      </div> 
</template>