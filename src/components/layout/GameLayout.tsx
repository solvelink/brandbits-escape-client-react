import useGameStore from "@/stores/gameStore";
import { LoadingSpinner } from "./LoadingSpinner";
import { Outlet } from "react-router";
import { LoadingState } from "@/types/enum";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const GameLayout = () => {
  const gameStore = useGameStore();
  const { t } = useTranslation();

  useEffect(() => {
    gameStore.fetchGame();
  }, []);

  if (gameStore.state === LoadingState.LOADING) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (gameStore.state === LoadingState.ERROR) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red bg-red/10 px-4 py-3 rounded-md">
          {t("common.error")}
        </div>
      </div>
    );
  }

  return <Outlet />;
};
