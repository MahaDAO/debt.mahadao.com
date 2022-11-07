import {LinearProgress, withStyles} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";
import theme from "../../theme";

interface IProps {
  barColor: string;
  percent: number;
  width?: string | number;
}

const ProgressBar = (props: IProps) => {
  const {
    barColor,
    percent = 50,
    width = 160,
  } = props;

  const BorderLinearProgress = withStyles(() =>
    createStyles({
      root: {
        height: 8,
        borderRadius: 5,
        width: width,
      },
      colorPrimary: {
        backgroundColor: theme.color.dark[300],
      },
      bar: {
        borderRadius: 5,
        backgroundColor: barColor,
      },
    }),
  )(LinearProgress);

  return (
    <BorderLinearProgress variant="determinate" value={percent} />
  )
}

export default ProgressBar;
