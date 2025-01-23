export function LoadingSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-500" />
    </div>
  );
}
