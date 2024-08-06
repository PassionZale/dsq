"use client";

import { useEffect } from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import { TailwindIndicator } from "./TailwindIndicator";
import { ThemeProvider } from "./ThemeProvider";
import useOptionSets from "@/store/optionSets";
import { getOptionSets } from "@/services";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const initOptionSets = useOptionSets((state) => state.init);
  const loading = useOptionSets((state) => state.loading);

  useEffect(() => {
    getOptionSets()
      .then(({ data }) => {
        initOptionSets({
          loading: false,
          items: data,
        });
      })
      .catch((error) => {
        initOptionSets({
          loading: false,
          items: [],
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />

        <Content>{!loading && children}</Content>

        <TailwindIndicator />
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
