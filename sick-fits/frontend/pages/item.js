import SingleItem from "../components/SingleItem";

const Item = props => (
  <div>
    <SingleItem id={props.query.id}>Single Item</SingleItem>
  </div>
);

export default Item;
