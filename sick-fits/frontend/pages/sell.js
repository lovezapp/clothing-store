import CreateItem from "../components/CreateItem";

// Stateless Component cannot reach "this"
const Sell = props => (
  <div>
    <CreateItem />
  </div>
);

export default Sell;
