import { useStore } from "@/entities";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface OpenModalPayload {
  key: string;
  id?: string;
  title?: string;
  description?: string;
  size?: ModalSize;
  dismissible?: boolean;
  confirmText?: string;
  cancelText?: string;
  payload?: unknown;
}

export function useModal() {
  const store = useStore();

  const openModal = (payload: OpenModalPayload) => store.dispatch("modal/open", payload);
  const closeModal = (modalId?: string) => store.dispatch("modal/close", modalId);
  const closeAllModals = () => store.dispatch("modal/closeAll");
  const updateModalPayload = (id: string, data: unknown) => store.dispatch("modal/updatePayload", { id, data });

  return {
    openModal,
    closeModal,
    closeAllModals,
    updateModalPayload,
  };
}
