const GLOBAL = {
    EXECUTION_STATUS: {
        RUNNING: 0,
        NORMAL_EXIT: 1,
        ERROR_EXIT: 2
    },
    CODE_RUN_STATUS: {
        // 正常退出
        EXIT_CODE_OK: 0,
        // 编译失败
        EXIT_CODE_COMPILE_ERROR: 1,
        // 超时退出
        EXIT_CODE_TIME_OUT: 2,
        // 运行出错
        EXIT_CODE_RUNTIME_ERROR: 3,
        // 其他错误
        EXIT_CODE_BASE_ERROR: 4
    }
};

export default GLOBAL;
