import { ChakraProvider } from "@chakra-ui/react";
import Game from "pages/Game";
import { FC } from "react";
import { RecoilRoot } from "recoil";

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Game/>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
