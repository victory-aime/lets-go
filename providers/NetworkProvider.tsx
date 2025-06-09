import React, { ReactNode, useEffect, useState } from 'react';

import NetInfo, {
  NetInfoCellularGeneration,
  NetInfoState,
  NetInfoStateType,
} from '@react-native-community/netinfo';
import { useAppState } from '@/app/hooks/useAppState';

type State = Partial<NetInfoState> & {
  isSlowConnection: boolean;
  isGatewayReachable: boolean;
};

type Props = {
  children: ReactNode;
};

export const NetworkContext = React.createContext<State>({
  isConnected: true,
  isInternetReachable: true,
  isSlowConnection: false,
  isGatewayReachable: true,
});

export const NetworkProvider = ({ children }: Props) => {
  const [netInfo, setNetInfo] = useState<State>({
    isConnected: true,
    isInternetReachable: true,
    isSlowConnection: false,
    isGatewayReachable: true,
  });

  const isSlowConnection = (state: NetInfoState) =>
    state.type === NetInfoStateType.cellular &&
    state.details.cellularGeneration === NetInfoCellularGeneration['2g'];

  const updateNetInfo = async (newState: NetInfoState) => {
    setNetInfo(prevState => ({
      ...prevState,
      ...newState,
      isSlowConnection: isSlowConnection(newState),
    }));
  };

  const checkNetworkState = async () => {
    const currentNetInfo = await NetInfo.fetch();
    setNetInfo(prevState => ({
      ...prevState,
      ...currentNetInfo,
      isSlowConnection: isSlowConnection(currentNetInfo),
    }));
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(updateNetInfo);
    return () => {
      unsubscribe();
    };
  }, []);
  useAppState({
    onResume: checkNetworkState,
  });

  return (
    <NetworkContext.Provider value={netInfo}>
      {children}
    </NetworkContext.Provider>
  );
};
