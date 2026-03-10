import { useStore } from "@/entities";
import { iOpenModalPayload } from "@/entities/store/modules/modal";

export function useModal() {
  const store = useStore();

  const openModal = (payload: iOpenModalPayload) => store.dispatch("modal/open", payload);
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
