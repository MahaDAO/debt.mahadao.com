import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import config from "../../config";
import IconLoader from "../IconLoader";

const Sidebar = () => {
  return (
    <SidebarDiv>
      <SidebarConatiner id={"sidebar_container"}>
        <TopSideBar>
          <StyledLink exact activeClassName="activeSidebar" to="/locker">
            Lock MAHA
          </StyledLink>
           {/*<StyledLink
            exact
            activeClassName="activeSidebar"
            to="/vote"
            isActive={(match, location) => {
              if (match || location.pathname.includes('/vote')) return true;
              else return false
            }}
          >
            Vote
          </StyledLink>*/}

          {/* <StyledLink exact activeClassName="activeSidebar" to="/gaugeWeightVote">
            Inflation Vote
          </StyledLink>
          <StyledLink exact activeClassName="activeSidebar" to="/gauge-boost">
            Reward Calculator
          </StyledLink>
          <StyledLink exact activeClassName="activeSidebar" to="/minter">
            Minter
          </StyledLink>*/}
           <StyledLink exact activeClassName="activeSidebar" to="/rewards">
            Rewards
          </StyledLink>
          <StyledLinkHref href="https://vote.mahadao.com" target={"_blank"}>
            <div className={"single-line-center-start"}>
              <p>Vote</p>
              <IconLoader iconName={"ArrowLinkColored"} iconType={"arrow"} />
            </div>
          </StyledLinkHref>
         {/* <StyledLink exact activeClassName="activeSidebar" to="/reward-vesting">
            Reward Vesting
          </StyledLink> */}
          <StyledLink exact activeClassName="activeSidebar" to="/debt-pool">
            Debt Pool
          </StyledLink>
          <StyledLinkHref href="https://discuss.mahadao.com" target={"_blank"}>
            <div className={"single-line-center-start"}>
              <p>Forum</p>
              <IconLoader iconName={"ArrowLinkColored"} iconType={"arrow"} />
            </div>
          </StyledLinkHref>
          {config.networkName === "Matic Mumbai Testnet" &&
            <StyledLink exact activeClassName="activeSidebar" to="/faucet">
              Faucet
            </StyledLink>
          }
        </TopSideBar>
        <BottomSideBar>
          <StyledLinkHref href="https://docs.mahadao.com/governance/governance-portal" target={'_blank'}>
            <div className={'single-line-center-start'}>
              <p>Documentation</p>
              <IconLoader iconName={'ArrowLinkColored'} iconType={'arrow'} />
            </div>
          </StyledLinkHref>
          <StyledLinkHref href="https://www.youtube.com/watch?v=qxtyvcckgGg&list=PL2bcCoQ5RXeGh-Gkh1QZE_SjevMIDdtgN&index=8" target={'_blank'}>
            <div className={'single-line-center-start'}>
              <p>Video Tutorials</p>
              <IconLoader iconName={'ArrowLinkColored'} iconType={'arrow'} />
            </div>
          </StyledLinkHref>
          <StyledLinkHref href="https://docs.google.com/forms/d/e/1FAIpQLSdeFG524PT4jrLYzbZZPUuuCY7Ty220Y3iSi1StvLbsk8JSXA/viewform" target={'_blank'}>
            <div className={'single-line-center-start'}>
              <p>Report a Bug</p>
              <IconLoader iconName={'ArrowLinkColored'} iconType={'arrow'} />
            </div>
          </StyledLinkHref>
        </BottomSideBar>
      </SidebarConatiner>
    </SidebarDiv>
  )
}

export default Sidebar;

const SidebarDiv = styled.div`
  min-width: 200px;
  max-width: 200px;
  min-height: 100vh;
  max-height: 100vh;
  @media (max-width: 600px) {
    display: none;
  }
`;

const SidebarConatiner = styled.div`
  width: 200px;
  background: #1F1E1E;
  border-radius: 6px;
  border: 1px solid;
  border-image-source: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  position: fixed;
  top: 0;
  padding: 16px;
  margin-top: calc(112px);
  min-height: calc(100vh - 144px);

  @media (max-width: 600px) {
    margin-top: calc(112px + 75px);
    min-height: calc(100vh - 144px - 75px);
  }
`;

const StyledLink = styled(NavLink)`
  padding: 8px 16px;
  width: 100%;
  border-radius: 2px;
  display: block;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF88;
  margin-bottom: 8px;
  &:hover {
    outline: 1px solid rgba(255, 255, 255, 0.08);
    color: #FFFFFF88;
    opacity: 1;
  }
  &:active {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 2px;
    width: 100%;
    color: #FFFFFF88;
    opacity: 1;
  }
`;

const TopSideBar = styled.div`
  padding-bottom: 104px
`;

const BottomSideBar = styled.div`
  position: absolute;
  bottom: 0;
  padding: 16px 0;
  width: calc(100% - 32px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const StyledLinkHref = styled.a`
  padding: 8px 16px;
  width: 100%;
  border-radius: 2px;
  display: block;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF88;
  margin-bottom: 8px;
  &:hover {
    outline: 1px solid rgba(255, 255, 255, 0.08);
    color: #FFFFFF88;
    opacity: 1;
  }
  &:active {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 2px;
    width: 100%;
    color: #FFFFFF88;
    opacity: 1;
  }
`
