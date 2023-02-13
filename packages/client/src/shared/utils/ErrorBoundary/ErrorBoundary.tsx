import React, { ErrorInfo, ReactNode } from "react";
import { Alert } from "@mui/material";

type ErrorBoundaryState = {
  hasError: boolean;
};
type ErrorBoundaryProps = {
  children?: ReactNode;
};
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Alert severity="error">Что-то пошло не так.</Alert>;
    }

    return this.props.children;
  }
}
