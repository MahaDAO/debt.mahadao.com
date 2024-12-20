import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addPopup,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
} from "./actions";
import { AppState } from "../index";
import { PopupContent } from "../../utils/interface";
import { useChainId } from "wagmi";

export function useBlockNumber(): number | undefined {
  const chainId = useChainId();
  return useSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen);
}

export function useWalletModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleWalletModal()), [dispatch]);
}

export function useSettingsMenuOpen(): boolean {
  return useSelector((state: AppState) => state.application.settingsMenuOpen);
}

export function useToggleSettingsMenu(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleSettingsMenu()), [dispatch]);
}

// Returns a function that allows adding a popup.
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }));
    },
    [dispatch]
  );
}

// Returns a function that allows removing a popup via its key.
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch]
  );
}

// Get the list of active popups.
export function useActivePopups(): AppState["application"]["popupList"] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}
