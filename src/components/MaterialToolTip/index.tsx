import React from 'react';
import styled from "styled-components";
import { Tooltip, withStyles } from "@material-ui/core";

import theme from "../../theme";

interface Iprops {
  toolTipContent: any;
  className?: string;
  children: any;
}

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: theme.color.dark[200],
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '12px 20px',
    margin: '12px 0'
  },
}))(Tooltip);

const MaterialToolTip = (props: Iprops) => {
  const {
    toolTipContent,
    className = "",
    children,
  } = props;

  // console.log("tooltip", typeof (toolTipContent))

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
          {toolTipContent}
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
        {children}
      </div>
    </HtmlTooltip>
  );
};

export default MaterialToolTip;

const ToolTipFont = styled.p`
  padding: 0;
  margin: 0;
  line-height: 150%;
`;

