export default function Loading() {
  return (
    <div
      className="d-flex items-center justify-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="text-center">
        <div
          style={{
            width: 48,
            height: 48,
            border: "3px solid rgba(201,168,76,0.2)",
            borderTop: "3px solid #C9A84C",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto",
          }}
        />
        <p className="text-14 text-light-1 mt-15">Loading...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
