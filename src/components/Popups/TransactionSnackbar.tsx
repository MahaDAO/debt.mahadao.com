import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';

import theme from '../../theme';
import '../../customCss/Custom-Snackbar.css';

import IconLoader from '../IconLoader';
import TextWrapper from '../TextWrapper';

import config from '../../config';
import { PopupContent } from '../../utils/interface';

interface TxButtonProps {
  notificationCount?: number;
  index?: number;
  open?: boolean;
  content?: PopupContent;
  handleCancel?: Function;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars: React.FC<TxButtonProps> = ({
  open,
  content,
  handleCancel,
}) => {

  const classes = useStyles();
  const [openSnackbar, setOpen] = React.useState(open);

  const isScucess = content?.txn?.success;
  const isLoading = content?.txn?.loading;

  useEffect(() => {
    setOpen(true)

    if(isScucess){
      setTimeout(() => {window.location.reload()}, 7000)

    }
  }, [isScucess, isLoading])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpen(false);
    if (handleCancel) handleCancel();
  };

  function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

  const SnackHeader = () => {
    if (isLoading) {
      return (
        <SnackBarInnerContainer style={{ background: theme.color.yellow[500] }}>
          <div className="single-line-center-start">
            <IconLoader
              iconName={"Pending"}
              iconType={"status"}
              width={24}
              className="pointer m-r-12"
              onClick={handleClose}
            />
            Transaction Pending
          </div>
          <IconLoader
            iconName={"Cross"}
            width={24}
            className="pointer"
            onClick={handleClose}
          />
        </SnackBarInnerContainer>
      )
    } else if (isScucess) {
      return (
        <SnackBarInnerContainer style={{ background: theme.color.green[500] }}>
          <div className="single-line-center-start">
            <IconLoader
              iconName={"Success"}
              iconType={"status"}
              width={24}
              className="pointer m-r-12"
              onClick={handleClose}
            />
            Transaction Successful
          </div>
          <IconLoader
            iconName={"Cross"}
            width={24}
            className="pointer"
            onClick={handleClose}
          />
        </SnackBarInnerContainer>
      )
    } else {
      return (
        <SnackBarInnerContainer style={{ background: theme.color.red[500] }}>
          <div className="single-line-center-start">
            <IconLoader
              iconName={"Alert"}
              iconType={"status"}
              width={24}
              className="pointer m-r-12"
              onClick={handleClose}
            />
            Transaction Failed
          </div>
          <IconLoader
            iconName={"Cross"}
            width={24}
            className="pointer"
            onClick={handleClose}
          />
        </SnackBarInnerContainer>
      )
    }
  }

  const SnackBody = () => {
    return (
      <SnackBarBody>
        <TextWrapper
          text={
            content?.txn?.success || content?.txn?.loading
              ? content?.txn?.summary || ""
              : content?.error?.message || "Error Occured"
          }
          fontWeight={300}
        />
        {
          config.etherscanUrl !== '' && content?.txn?.hash && (
            <AnchorTag
              href={`${config.etherscanUrl}/tx/${content?.txn?.hash}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <TextWrapper
                text={'View on Explorer'}
                fontWeight={300}
                Fcolor={theme.color.transparent[200]}
              />
              <IconLoader
                iconName={"ArrowLink"}
                iconType={"arrow"}
                width={24}
                className="pointer m-l-2 "
                onClick={handleClose}
              />
            </AnchorTag>
          )
        }
      </SnackBarBody>
    )
  }

  return (
    <div className={classes.root}>
      {openSnackbar && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <SnackBarParent>
            {SnackHeader()}
            {SnackBody()}
          </SnackBarParent>
        </Snackbar>
      )}
    </div>
  );
};

const AnchorTag = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 4px;
  &:hover {
    text-decoration: none;
  }
`;

const SnackBarInnerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height:  50px;
  padding: 0 12px 0 18px;
  justify-content: space-between;
  border-radius: 4px 4px 0 0;
`;

const SnackBarBody = styled.div`
  background: ${theme.color.dark[300]};
  backdrop-filter: blur(70px);
  border-radius: 0 0 4px 4px;
  padding: 12px 12px 12px 52px;
  font-weight: 600;
  font-size: 14px;
  width: 100%;
`;

const SnackBarParent = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 4px 4px 0 0;
  border: 1px solid;
  width: 378px;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 116, 38, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  color: #ffffff;
  opacity: 0.88;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default CustomizedSnackbars;
