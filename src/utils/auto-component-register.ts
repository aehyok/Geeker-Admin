export const autoComponentRegister = (app: any) => {
  const register = (componentsContext: any) => {
    console.log(componentsContext, "componentsContext");
    componentsContext.keys().forEach((filePath: any) => {
      const fileName = filePath.split("/")[1].split(".")[0];

      const componentConfig = componentsContext(filePath);
      if (/.vue$/.test(filePath)) {
        app.component(fileName, componentConfig.default);
      } else {
        app.use(componentConfig);
      }
    });
  };

  const itemView = import.meta.glob("@/components/form/input/item/*.vue", { eager: true });

  const view = [itemView];
  view.forEach((item: any) => {
    register(item);
  });
};
