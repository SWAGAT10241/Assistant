import React from "react";
import Button from "./Button";

/**
 * React Error Boundary component to prevent application white-screens
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-2xl font-bold">
              !
            </div>
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-gray-400 text-sm">
              An unexpected error occurred while rendering this view.
            </p>
            {this.state.error?.message && (
              <pre className="w-full bg-black/40 text-red-300 text-xs p-3 rounded-xl overflow-x-auto text-left">
                {this.state.error.message}
              </pre>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={this.handleReload}
              className="mt-2 w-full"
            >
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

