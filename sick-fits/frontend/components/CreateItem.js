import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Title here",
    description: "A good description",
    image: "",
    largeImage: "",
    price: 1000
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val // use Computed Property Name [name] to take care of any key
    });
  };

  uploadFile = async e => {
    console.log("Uploading file...");
    const files = e.target.files; // array of files
    const data = new FormData(); // provides a way to easily construct a set of key/value pairs representing form fields and their values
    const endpoint = "https://api.cloudinary.com/v1_1/lovezapp/image/upload/";
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits"); // preset needed by Cloudinary

    const res = await fetch(endpoint, { method: "POST", body: data });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager ? file.eager[0].secure_url : file.secure_url
    });
  };

  render() {
    const { title, price, image, description } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createItem();
              // route them to the single item page
              console.log(res);
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  name="file"
                  id="file"
                  placeholder="Upload an Image"
                  required
                  onChange={this.uploadFile}
                />
                {image && <img src={image} alt="Upload Preview" />}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter a Description"
                  required
                  value={description}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
