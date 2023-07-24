"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 编译过程扩展
 */
exports.default = (ctx, pluginOpts) => {
    ctx.onBuildStart(() => { });
    ctx.onBuildComplete(() => { });
    // 修改编译后结果
    ctx.modifyBuildAssets(() => {
        var _a, _b;
        const { fs } = ctx.helper;
        const filePath = ctx.paths.appPath + "/project.config.json";
        const fileOption = { encoding: "utf-8" };
        const fileContent = fs.readFileSync(filePath, fileOption);
        let config = JSON.parse(fileContent.toString());
        let appid = (pluginOpts === null || pluginOpts === void 0 ? void 0 : pluginOpts.appid) ||
            ((_b = (_a = ctx.initialConfig) === null || _a === void 0 ? void 0 : _a.mini) === null || _b === void 0 ? void 0 : _b.appid) ||
            config.appid;
        config.appid = appid;
        console.log("修改编译后的appid为", appid);
        let newConfigStr = JSON.stringify(config, null, 2);
        ctx.writeFileToDist({
            filePath: "project.config.json",
            content: newConfigStr,
        });
        if (pluginOpts === null || pluginOpts === void 0 ? void 0 : pluginOpts.sourceEdit) {
            fs.writeFileSync(filePath, newConfigStr, fileOption);
        }
    });
    ctx.onBuildFinish(() => { });
};
//# sourceMappingURL=index.js.map