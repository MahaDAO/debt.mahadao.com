import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

export const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 33,
      height: 19,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 1.5,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#FF7F57',
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 17,
      height: 16,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }),
)(Switch);