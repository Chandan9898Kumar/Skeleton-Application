import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div
      style={{
        gap: "16px",
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "16px",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          Banking Demo
        </h1>
        <p
          style={{
            fontSize: "20px",
            marginBottom: "32px",
            opacity: 0.9,
          }}
        >
          Reusable skeletons with virtual lists
        </p>
        <Link
          to="/account"
          style={{
            display: "inline-block",
            padding: "16px 32px",
            background: "white",
            color: "#667eea",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
          }}
        >
          View Account →
        </Link>
        {"  "}
        <Link
          to="/local-transfer-payee"
          style={{
            display: "inline-block",
            padding: "16px 32px",
            background: "white",
            color: "#667eea",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
          }}
        >
          View payee →
        </Link>
        <Link
          to="/custom-success-error"
          style={{
            display: "inline-block",
            padding: "16px 32px",
            background: "white",
            color: "#667eea",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
          }}
        >
          View Success / Error Screen →
        </Link>
      </div>
    </div>
  );
};

export default Index;
