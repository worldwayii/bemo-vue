<template>
    <VModal name="edit-card">
    <div slot="top-right">
    <button @click="$modal.hide('edit-card')" @before-open="before()">
        ❌
    </button>
    </div>
    <h3>Edit Card {{passedData.id}}</h3>
    <form class="login" @submit.prevent="editCard(passedData, edit)">
    <div>
        <div>
            <label>Title </label>
            <input type="text" name="title" v-model="edit.title" :v-bind="passedData.title">
        </div>
        <div>
            <label>Description </label>
            <textarea  
                required
                class="" 
                title="description"
                :v-bind="edit.description"
                v-model="edit.description"
            >
            </textarea>
        </div>
    </div>
        <button type="submit">Submit</button>
    </form>
    </VModal>
</template>

<script>

export default {
 props: ["passedData"],
  data() {
    return {
    //   editing_col_id: 0,
      edit: []
    }
  },
    

   methods: {
    editCard(cardId, edit){
        console.log('vofff', edit)
      console.log(cardId, 'login from')
   
    },
    before(){

    }
  },

}
</script>
