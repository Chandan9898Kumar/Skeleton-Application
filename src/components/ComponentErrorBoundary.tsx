import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
interface Props {
  children: ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ComponentErrorBoundary extends Component<Props, State> {
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
    console.error(
      `ComponentErrorBoundary (${
        this.props.componentName || "Unknown"
      }) caught an error:`,
      error,
      errorInfo
    );

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px 20px",
            backgroundColor: "hsl(var(--muted))",
            borderRadius: "12px",
            textAlign: "center",
            margin: "20px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "16px",
            }}
          >
            ⚠️
          </div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "8px",
              color: "hsl(var(--foreground))",
            }}
          >
            {this.props.componentName || "This component"} encountered an error
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "hsl(var(--muted-foreground))",
              marginBottom: "20px",
            }}
          >
            Please try again or refresh the page
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              padding: "10px 20px",
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary;
