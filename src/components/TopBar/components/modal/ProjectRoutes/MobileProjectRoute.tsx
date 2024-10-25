import IconLoader from "@/components/IconLoader/IconLoader";
import Modal from "@/components/Modal/Modal";
import TextWrapper from "@/components/TextWrapper.tsx/TextWrapper";

interface Iprops {
  openModal: boolean;
  onDismiss: () => void;
}

const MobileProjectRoutes = (props: Iprops) => {
  const { onDismiss, openModal } = props;

  if (!openModal) return null;

  return (
    <Modal open={openModal} handleClose={onDismiss}>
      <div
        className="single-line-center-start m-b-40 pointer"
        onClick={() => {
          window.open("https://arthcoin.com/");
        }}
      >
        <IconLoader
          iconName={"Loans"}
          iconType={"products"}
          className={"m-r-16"}
        />
        <div>
          <TextWrapper
            text={"Interest free Loans"}
            fontWeight={600}
            className={"m-b-4"}
          />
          <TextWrapper text={"Interest free ARTH loans."} />
        </div>
      </div>
      <div
        className="single-line-center-start pointer"
        onClick={() => {
          window.open("https://mahastarter.com/#/");
        }}
      >
        <IconLoader
          iconName={"Starter"}
          iconType={"products"}
          className={"m-r-16"}
        />
        <div>
          <TextWrapper
            text={"MahaStarter"}
            fontWeight={600}
            className={"m-b-4"}
          />
          <TextWrapper text={"Incubator for the MahaDAO Ecosystem"} />
        </div>
      </div>
    </Modal>
  );
};

export default MobileProjectRoutes;
