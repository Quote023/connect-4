import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";
import { RecoilRoot } from "recoil";
import Router from "Router";

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Router/>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
