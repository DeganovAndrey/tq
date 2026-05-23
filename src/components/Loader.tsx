import { useIsFetching } from "@tanstack/react-query";

const Loader = () => {
  const isFetching = useIsFetching();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "16px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div style={{ fontWeight: "bold" }}>My app</div>

      {isFetching > 0 ? (
        <div>
          <p style={{ color: "red" }}> Loading... ({isFetching})</p>
        </div>
      ) : (
        <div style={{ color: "green" }}> All loaded</div>
      )}
    </div>
  );
};

export default Loader;
