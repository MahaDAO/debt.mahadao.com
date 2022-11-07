import TextWrapper, {TextWrapperProps} from "../TextWrapper";
import theme from "../../theme";
import React from "react";
import {tracking_params} from "../Button/Button";
import {Mixpanel} from "../../analytics/Mixpanel";
import config from "../../config";

interface IProps {
  onClick: () => void;
  tracking_id?: string;
  tracking_params?: tracking_params;
}

const TextButton = (props: IProps & TextWrapperProps) => {
  const {onClick, tracking_id, tracking_params = {}} = props;

  const trackMixpanel = () => {
    const params = {
      networkName: config.networkDisplayName || "",
      ...tracking_params,
    };
    if (tracking_id) {
      console.log('track', `buttonClick:${tracking_id.toLowerCase()}`, params);
      Mixpanel.track(`buttonClick:${tracking_id.toLowerCase()}`, params)
    }
  }

  return (
    <div
      className={'pointer'}
      onClick={() => {
        if (tracking_id) trackMixpanel();
        if (onClick) onClick();
      }}
    >
      <TextWrapper
        Fcolor={theme.color.primary[300]}
        {...props}
      />
    </div>
  )
}

export default TextButton;
