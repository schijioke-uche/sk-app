import React from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from 'carbon-components-react';
const ModalComponent = ({
  openModal,
  setOpenModal,
  modalState,
  primaryButtonMessage,
  secondaryButtonMessage,
}) => {
  return (
    <ComposedModal size="md" open={openModal}>
      <ModalHeader />
      <ModalBody hasScrollingContent aria-label="courses">
        <p className=".bx--modal-content__text">{modalState.message}</p>
      </ModalBody>
      <ModalFooter>
        {secondaryButtonMessage && (
          <Button kind="secondary">{secondaryButtonMessage}</Button>
        )}
        {primaryButtonMessage && (
          <Button onClick={() => setOpenModal(false)}>
            {primaryButtonMessage}
          </Button>
        )}
      </ModalFooter>
    </ComposedModal>
  );
};

export default ModalComponent;
