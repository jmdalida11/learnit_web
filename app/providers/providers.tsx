import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
  Theme,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={system}>
      <Theme appearance="dark">{children}</Theme>
    </ChakraProvider>
  );
};

export default Providers;
