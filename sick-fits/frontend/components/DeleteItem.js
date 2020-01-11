import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  confirmAndDelete = (e, deleteItem) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem();
    }
  };

  update = (cache, payload) => {
    // cache and payload provided by Apollo
    // manually update the cache on the client so that it reflects the server
    // 1. read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  render() {
    const { id, children } = this.props;

    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button onClick={e => this.confirmAndDelete(e, deleteItem)}>
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
