import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught By React Error Boundary logged to firebase");
  }
  componentDidUpdate(prevProps){
    if(prevProps.children!== this.props.children && this.state.hasError){
      this.setState({ hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-6xl font-bold text-gray-700 p-8 text-center">
            Oops! Something went wrong.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
