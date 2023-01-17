<template>
  <div id="app" class="ui">
     <nav class="navbar navbar--app">BeMo: The Leading Admissions Experts | BeMo &reg;</nav>
      <nav class="navbar navbar--board">Task Columns</nav>
      <div class="columns">

        <!-- columns -->
        <div class="columns__column"  v-for="column in columns" :key="column.id" slot="">
          <header class="column__header"> {{column.title}}
            <button class="column__button column__button--close"  @click="deleteColumn(column.id)">x</button>
          </header>
        <!-- <ul 
          class="cards drop__zone" 
          @drop="onDrop($event, column.id)"
          @dragover.prevent  
          @dragenter.prevent
        >
          <li  class="drag__el"  v-for="item in column.cards" :key="item.title" draggable  @dragstart="startDrag($event, item), drag($event, item)">
            <h3> {{ item.title }}</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lobortis enim sit amet metus laoreet, ut condimentum
          </li>
        </ul> -->

         <draggable
            :columns="columns"
            :disabled="!enabled"
            class="cards drop__zone"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <div class="drag__el" v-for="(item, index) in column.cards" :key="index+1" @click="edit(item.id, item)">
              <div>{{ item.title }}</div>
              <div>{{ item.description }}</div>
            </div>
          </draggable>

        <footer>
          <div>
            <button @click="create(column.id)">Add Card</button>
             <VModal name="create-card">
              <div slot="top-right">
                <button @click="$modal.hide('create-card')">
                  ❌
                </button>
              </div>
              <h3>Add Card</h3>
              <form class="login" @submit.prevent="createCard(column.id)">
                <div>
                  <div>
                    <label>Title</label>
                    <input
                      required
                      type="text"
                      class=""
                      placeholder="Card Title"
                      v-model="cardTitle"
                    />
                    <input type="hidden"  :value="column.id">
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea  
                      required
                      class="" 
                      v-model="cardDescription"
                    >
                    </textarea>
                  </div>
                </div>
                  <button type="submit">Submit</button>
              </form>
             </VModal>
          </div>
             <edit-card :passedData="passedData"> </edit-card>
        </footer>
      </div>

      <!-- New column -->
      <div class="columns__column" >
        <input
            type="text"
            class="input__new__card"
            placeholder="Add new Column"
            v-model="columnTitle"
            @keyup.enter="createColumn"
          />
      </div>  

      
    </div>
    
  </div>
</template>

<script>
// import Column from './components/Column.vue'
import EditCard from './components/EditCard.vue'
// import { createStore } from "vuex";
import draggable from 'vuedraggable'
import { mapGetters, mapState, mapActions} from "vuex";
import rootMutations from "./store/mutations.js";
import rootActions from "./store/actions.js";
import rootGetters from "./store/getters.js";
// import VModal from 'vue-js-modal'

export default {
  name: 'App',
  components: {
    draggable,
    // Column,
    EditCard
  },
  
  created () {
    this.getAllColumns()
  },
  data() {
    return {
      passedData:{id:null, title:null, description:null},
      // editing_col_id: 0,
      creating_col_id: 0,
      enabled: true,
      columnTitle: '',
      cardTitle: '',
      cardDescription: '',
      columnId: '',
    }
  },

  computed: {
    ...mapState(["columns", "cards"]),
    ...mapGetters([ "columns",  "cards"]),

    listOne() {
      return this.items.filter((item) => item.list === 1)
    },
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
    
    // listCards() {
    //   return this.columns.columns.filter((card) => card.column_id === columnID)
    // },
  
  },

   methods: {
    ...mapActions(["getColumns"]),

    async getAllColumns() {
       try {
         await this.getColumns() 
       }
       catch (err) {
        err;
      }
    },

    create(columnID){
      this.creating_col_id = columnID;
      this.$modal.show('create-card')
    },
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      console.log(evt, evt.offsetX + evt.offsetY)
      evt.dataTransfer.setData('itemID', item.id)
      // evt.dataTransfer.setData('cardID', card.id)
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData(list)      
      // const cardID = evt.dataTransfer.getData(column)      
      const item = this.items.find((item) => item.id == itemID)      
      // const card = this.columns.cards.filter((card) => column_id == cardID)      
      item.list = list
    },

    async deleteColumn(columnId){
     try {
         await this.$store.dispatch("deleteColumn", {column_id:columnId});
       }
       catch (err) {
        err;
      }
    },

    async createCard(){
      try {
        let title = this.cardTitle;
        let description = this.cardDescription;
        
        if (title !== "" && description !== "") {
          await this.$store.dispatch("saveCard", {title:this.cardTitle, description:this.cardDescription, column_id:this.creating_col_id});
          this.creating_col_id = 0;
        }
       }
       catch (err) {
        err;
      }      
      
    },
    edit(cardId, item){
      this.editing_col_id = cardId;
      this.passedData = item;
      console.log(cardId, this.passedData)
      this.$modal.show('edit-card')
    },

    async createColumn(){
      try {
        let title = this.columnTitle;

        if (title !== "") {
        await this.$store.dispatch("createColumn", {title:this.columnTitle});
      }
       }
       catch (err) {
        err;
      }      
    }
    
  },
  mutations: rootMutations, 
  actions: rootActions,
  getters: rootGetters,
}
</script>

<style lang="scss">
  @import "./assets/scss/shared.scss";

  .drop__zone {  
    background-color: #eee;
    margin-bottom: 10px;  
    padding: 10px;
  }
  .drag__el {  
    background-color: #fff;  
    margin-bottom: 10px;  
    padding: 5px;
  }
  .input__new__card {

  height: 30px;
  padding: 0 90px 10px 0px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
