// import axios from 'axios';

export default {
    getColumns(state, columns) {
      state.columns = columns;
    },
    createNewColumn(state, column) {
      state.columns = column;
    },
    createNewCard(state, card) {
      state.cards.push(card);
    },
    saveCard(state, cards) {
      state.cards = cards;
    },
    removeColumn(state, payload) {
      state.columns.splice(payload);
    },
    deleteCard(state, payload) {
        const indexToDelete = state.cards
          .map((card) => card.id)
          .indexOf(payload.id);
        state.cards.splice(indexToDelete, 1);
      },
  };
  