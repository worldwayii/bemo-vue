import axios from 'axios';

export default {
  getColumns(context) {
    new Promise((resolve, reject) => {
      const token = 'h9u404-4n3mnd'
        axios({url: 'columns', method: 'GET',  headers: {
            'Authorization': `access_token ${token}`, 'token_type': 'access_token'
          } 
        })
         .then(resp => {
            const columns = resp.data.data
            context.commit("getColumns", columns);
            resolve(resp)
         })
         .catch(err => {
            reject(err)
         })
    })
  
  },
    createColumn(context, payload) {
      new Promise((resolve, reject) => {
        const token = 'h9u404-4n3mnd'
          axios({url: 'columns', data: payload, method: 'POST',  headers: {
              'Authorization': `access_token ${token}`, 'token_type': 'access_token'
            } 
          })
           .then(resp => {
              const column = resp.data.data
              context.commit("createNewColumn", column);
              resolve(resp)
              window.location.reload(true)
           })
           .catch(err => {
              reject(err)
           })
      })
    
    },
    createCard(context, payload) {
      context.commit("createNewCard", payload);
    },
    saveCard(context, payload) {
      new Promise((resolve, reject) => {
        const token = 'h9u-04-4n3mnd'
          axios({url: 'columns/'+payload['column_id']+'/cards', data: payload, method: 'POST',  headers: {
              'Authorization': `access_token ${token}`, 'token_type': 'access_token'
            } 
          })
           .then(resp => {
              const card = resp.data.data
              context.commit("saveCard", card);
              resolve(resp)
              window.location.reload(true)
              
           })
           .catch(err => {
              reject(err)
           })
      })
     
    },
    deleteColumn(context, payload) {
      new Promise((resolve, reject) => {
        const token = 'h9u-04-4n3mnd'
          axios({url: 'columns/'+payload['column_id'], data: payload, method: 'DELETE',  headers: {
              'Authorization': `access_token ${token}`, 'token_type': 'access_token'
            } 
          })
           .then(resp => {
              const payload = resp.data.data
              context.commit("removeColumn", payload);
              resolve(resp)
              window.location.reload(true)
           })
           .catch(err => {
              reject(err)
           })
      })
    },
    deleteCard(context, payload) {
        context.commit("deleteCard", payload);
      },
  };