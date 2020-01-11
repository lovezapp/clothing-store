import UpdateItem from "../components/UpdateItem";

// Stateless Component does not have access to "this"
// props.query destructured into {query}
const Update = ({ query }) => (
  <div>
    {/* query is exposed via ctx in the _app.js file in function getInitialProps */}
    <UpdateItem id={query.id} />
  </div>
);

/*if we didn't have access to `query` from _app.js,
we could have exported it to the component using withRouter(Update) */
export default Update;
