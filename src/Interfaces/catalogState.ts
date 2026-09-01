export interface CatalogStateProps {
  status: "loading" | "success" | "error";
  hasSearch: boolean;
  onRetry: () => void;
}
