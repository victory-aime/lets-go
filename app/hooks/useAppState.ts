import { useCallback, useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import useIsMounted from "./useIsMounted";

const activeStatus: AppStateStatus = "active";
const inActivePattern = /inactive|background/;

type UseAppStateProps = {
  onForeground?: () => void;
  onChange?: () => void;
  onResume?: () => void;
};

type UseAppStateValue = {
  appState: AppStateStatus;
};

export const useAppState = (
  appStateHandlers: UseAppStateProps
): UseAppStateValue => {
  const [appState, setAppState] = useState(AppState.currentState);
  const isMounted = useIsMounted();

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (!isMounted.current) return;

      if (inActivePattern.test(nextAppState)) {
        appStateHandlers?.onForeground?.();
      }

      if (nextAppState === activeStatus && inActivePattern.test(appState)) {
        appStateHandlers?.onResume?.();
      }

      appStateHandlers?.onChange?.();

      setAppState(nextAppState);
    },
    [appState, appStateHandlers, isMounted]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  return { appState };
};
