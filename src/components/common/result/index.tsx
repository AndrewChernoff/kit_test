export const Result = ({ status }: { status: string }) => {
    if (status === "success") {
      return <p>✅ Success!</p>;
    } else if (status === "fail") {
      return <p>❌ Failed!</p>;
    } else if (status === "uploading") {
      return <p>⏳ Started...</p>;
    } else {
      return null;
    }
  };