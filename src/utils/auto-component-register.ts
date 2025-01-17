export const autoComponentRegister = (app: any) => {
  const register = (componentsContext: any) => {
    console.log(Object.entries(componentsContext), "componentsContext");
    Object.entries(componentsContext).forEach((item: any) => {
      console.log(item, "filePath--------");
      const fileName = item[0].split("/").pop().split(".")[0];
      console.log(fileName, "----fileName---");
      if (/.vue$/.test(item[0])) {
        app.component(fileName, item[1].default);
      } else {
        app.use(item[1].default);
      }
    });
  };

  const itemView = import.meta.glob("@/components/Form/input/*.vue", { eager: true });

  console.log(itemView, "itemView");
  const view = [itemView];
  view.forEach((item: any) => {
    register(item);
  });
};
