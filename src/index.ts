import type { IPluginContext } from "@tarojs/service";
/**
 * 编译过程扩展
 */
export default (
  ctx: IPluginContext,
  pluginOpts: { appid?: string; sourceEdit?: boolean }
) => {
  ctx.onBuildStart(() => {});

  ctx.onBuildComplete(() => {});

  // 修改编译后结果
  ctx.modifyBuildAssets(() => {
    const { fs } = ctx.helper;
    const filePath = ctx.paths.appPath + "/project.config.json";
    const fileOption = { encoding: "utf-8" };
    const fileContent = fs.readFileSync(filePath, fileOption);
    let config = JSON.parse(fileContent.toString());
    let appid =
      pluginOpts?.appid ||
      (ctx.initialConfig?.mini as any)?.appid ||
      config.appid;

    config.appid = appid;
    console.log("修改编译后的appid为", appid);

    let newConfigStr = JSON.stringify(config, null, 2);
    ctx.writeFileToDist({
      filePath: "project.config.json",
      content: newConfigStr,
    });
    if (pluginOpts?.sourceEdit) {
      fs.writeFileSync(filePath, newConfigStr, fileOption);
    }
  });

  ctx.onBuildFinish(() => {});
};
