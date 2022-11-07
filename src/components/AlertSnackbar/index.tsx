import styled from 'styled-components';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';

import theme from '../../theme';
import '../../customCss/Custom-Snackbar.css';

import IconLoader from '../IconLoader';
import TextWrapper from '../TextWrapper';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& > * + *': {
    },
  },
}));

interface Iprops {
  open: boolean;
  handleCancel?: () => {};
  title?: string;
  subTitle?: string;
  type?: 'alert' | 'warning' | 'default';
}

const AlertSnackbar = (props: Iprops) => {
  const {
    open,
    handleCancel,
    type = "default",
    title,
    subTitle
  } = props;

  const classes = useStyles();
  const [openSnackbar, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open)
  }, [open])

  const handleClose = () => {
    setOpen(false);
    if (handleCancel) handleCancel();
  };

  function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
  }

  const backgroundColour = () => {
    let temp = { background: theme.color.yellow[500] }
    if (type === 'alert') {
      temp = { background: theme.color.red[500] }
    }
    return temp

  }

  return (
    <div className={classes.root}>
      {openSnackbar && <Snackbar
        open={openSnackbar}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackBarParent style={backgroundColour()}>
          <div className='single-line-center-start'>
            <IconLoader iconName={'Caution'} iconType={'status'} className='m-r-8' />
            <div>
              {title && <TextWrapper
                text={title}
                fontWeight={600}
                fontSize={16}
                className="m-b-4"
              />}
              {subTitle && <TextWrapper
                text={subTitle}
                fontWeight={300}
                fontSize={16}
              />}
            </div>
          </div>
          <IconLoader
            iconName={'Cross'}
            className='pointer'
            onClick={handleClose}
          />
        </SnackBarParent>
      </Snackbar>}
    </div>
  );
};

const SnackBarParent = styled.div`
  backdrop-filter: blur(70px);
  border: 1px solid;
  width: max-content;
  padding: 16px;
  border-radius: 6px;
  min-width: 728px;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 116, 38, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    width: max-content;
    min-width: auto;
  }
`;

export default AlertSnackbar;
