interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <div>
        <strong>Something went wrong.</strong>
        <p>{message}</p>
      </div>
      <button
        type="button"
        className="ghost-button"
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        Dismiss
      </button>
    </div>
  );
}

export default ErrorBanner;
