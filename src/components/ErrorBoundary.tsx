import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
            backgroundColor: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "20px",
              }}
            >
              ⚠️
            </div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "12px",
                color: "hsl(var(--destructive))",
              }}
            >
              Something Went Wrong
            </h1>
            <p
              style={{
                fontSize: "16px",
                marginBottom: "24px",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              We encountered an unexpected error. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            {this.state.error && (
              <details
                style={{
                  marginBottom: "24px",
                  padding: "12px",
                  backgroundColor: "hsl(var(--muted))",
                  borderRadius: "8px",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: "500" }}>
                  Error Details
                </summary>
                <pre
                  style={{
                    marginTop: "12px",
                    overflow: "auto",
                    fontSize: "12px",
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                onClick={this.handleReset}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--secondary-foreground))",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
