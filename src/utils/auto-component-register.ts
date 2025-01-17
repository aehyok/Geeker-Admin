export const autoComponentRegister = (app: any) => {
  const register = (componentsContext: any) => {
    Object.entries(componentsContext).forEach((item: any) => {
      const fileName = item[0].split("/").pop().split(".")[0];

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
