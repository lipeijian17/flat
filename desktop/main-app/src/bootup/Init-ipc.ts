import { windowManager } from "../utils/WindowManager";
import { appActionAsync, appActionSync, injectionWindowIPCAction } from "../utils/IPCActions";
import { constants, ipc } from "flat-types";
import { ipcMain } from "electron";

export default () => {
    const appActionAsyncKeys = Object.keys(appActionAsync) as (keyof ipc.AppActionAsync)[];
    appActionAsyncKeys.forEach(k => {
        ipcMain.on(k, (_event, args: any) => {
            appActionAsync[k](args);
        });
    });

    const appActionSyncKeys = Object.keys(appActionSync) as (keyof ipc.AppActionSync)[];
    appActionSyncKeys.forEach(k => {
        ipcMain.handle(k, appActionSync[k]);
    });

    const mainWin = windowManager.getWindow(constants.WindowsName.Main)!;
    injectionWindowIPCAction(mainWin);
};
