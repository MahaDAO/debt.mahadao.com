import React from 'react';
import styled from 'styled-components';

import TextWrapper from '../TextWrapper';

interface IProps {
  title: string;
  subTitle: string;
  showLearnMore?: boolean;
  learnMoreLink?: string;
  className?: string;
}

const PageHeader = (props: IProps) => {
  const {
    title,
    subTitle,
    showLearnMore = false,
    learnMoreLink = '',
    className = ""
  } = props;

  return (
    <Header className={`text-left ${className}`}>
      <TextWrapper
        text={title}
        fontFamily={'Syne'}
        fontSize={24}
        FletterSpacing={'0.1rem'}
        fontWeight={'bold'}
        className={'m-b-4'}
      />
      <SubtitleDiv className="single-line-center-start">
        <TextWrapper
          text={subTitle}
          fontWeight={300}
          fontSize={16}
          Fcolor={'#ffffff88'}
          className={"m-r-8"}
        />
        {showLearnMore &&
          <LearnMoreLink href={learnMoreLink} target={'_blank'}>
            <TextWrapper
              text={'Learn more'}
              fontWeight={300}
              fontSize={16}
              Fcolor={'#FF7F57'}
            />
          </LearnMoreLink>
        }
      </SubtitleDiv>
    </Header>
  )
}

export default PageHeader;

const Header = styled.div`
  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

const SubtitleDiv = styled.div`
  @media (max-width: 600px) {
    display: block;
  }
`;

const LearnMoreLink = styled.a`
  @media (max-width: 600px) {
    margin-top: 4px;
  }
`;
