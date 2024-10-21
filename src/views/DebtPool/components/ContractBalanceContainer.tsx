import TextWrapper from "@/components/TextWrapper.tsx/TextWrapper";
import React from "react";
import Loader from "react-spinners/BeatLoader";
import customTheme from "@/customTheme";

const ContractBalanceContainer = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        className="material-primary m-b-16 single-line-center-center"
        style={{ flex: 1 }}
      >
        <div className="m-b-8">
          {
            // loading
            false ? (
              <Loader color="#fff" loading={true} size={4} margin={2} />
            ) : (
              <TextWrapper
                text={
                  Number("22452432").toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                  }) + " ARTH-DP"
                }
                fontSize={24}
                fontWeight={"bold"}
                Fcolor={"#FFFFFF"}
                className="m-b-16"
                align={"center"}
              />
            )
          }
          {false ? (
            <Loader color="#ffffff" loading={true} size={4} margin={2} />
          ) : (
            <TextWrapper
              text={`(${Number("20").toLocaleString(undefined, {
                minimumFractionDigits: 3,
              })} % debt burned)`}
              fontSize={24}
              Fcolor={customTheme.color.transparent[100]}
              align="center"
            />
          )}
        </div>
      </div>
      <div
        className="material-primary single-line-center-center"
        style={{ flex: 1 }}
      >
        <div>
          {false ? (
            <div className="single-line-center-center">
              <Loader color="#ffffff" loading={true} size={4} margin={2} />
            </div>
          ) : (
            <TextWrapper
              text={`$ ${Number("1234").toLocaleString(undefined, {
                minimumFractionDigits: 3,
              })}`}
              fontSize={24}
              fontWeight={"bold"}
              align={"center"}
              className="m-b-16"
            />
          )}
          <div className="single-line-center-center m-b-16">
            <TextWrapper
              fontSize={24}
              text={"Total debt issued"}
              Fcolor={customTheme.color.transparent[100]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractBalanceContainer;
