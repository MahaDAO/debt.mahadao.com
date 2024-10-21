import { styled } from "@mui/material/styles";
import customTheme from "@/customTheme";
import TextWrapper from "../TextWrapper.tsx/TextWrapper";

interface StatesProps {
  state: "error" | "warning" | "default";
  msg?: string;
  children: any;
}

const States = (props: StatesProps) => {
  const { state, msg = "", children } = props;

  let color = customTheme.color.transparentog;
  if (state === "error") {
    color = customTheme.color.red[300];
  } else if (state === "warning") {
    color = customTheme.color.yellow[300];
  }

  return (
    <div>
      <Container style={{ borderColor: color }}>{children}</Container>
      <TextWrapper text={msg} className="m-t-4" fontSize={12} Fcolor={color} />
    </div>
  );
};

const Container = styled("div")({
  border: "1px solid",
  borderRadius: "6px",
});

export default States;
