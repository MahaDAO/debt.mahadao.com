import React from 'react';
import styled from "styled-components";
import { Tooltip, withStyles } from "@material-ui/core";

import theme from "../../theme";
import IconLoader from "../IconLoader";

type props = {
  toolTipText?: string;
  className?: string
};

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: theme.color.dark[200],
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '20px',
  },
}))(Tooltip);

const ToolTip: React.FC<props> = (props) => {
  const {
    toolTipText = "hello"
  } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };


  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <ToolTipFont>{toolTipText}</ToolTipFont>
        </React.Fragment>
      }
      aria-label="add"
      disableHoverListener
      onMouseEnter={() => show()}
      onClick={() => show()}
      onMouseLeave={() => hide()}
      open={open || false}
    >
      <div className="single-line-center-center">
        <IconLoader iconName={'InfoToolTip'} className="pointer m-l-4" />
      </div>
    </HtmlTooltip>
  );
};

export default ToolTip;

const ToolTipFont = styled.p`
  padding: 0;
  margin: 0;
`;

